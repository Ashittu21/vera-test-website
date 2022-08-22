
document.addEventListener('DOMContentLoaded', function () { 
  
  if (document.body.classList.contains('bc-careers')){ 
    async function loadIntoTable(url, table){
      const tableBody = table.querySelector('tbody');
      axios.get(url).then(function (response) {
        

        
        // Vars
        var optionSelected = [];
        const contenttags = document.querySelector('#JobsearchTags');
        const inputsearch = document.querySelector('.contentInput_search');
        const btnclear = document.querySelector('.contentInput__close');
        // const tablejobs = document.querySelector('.tableJob');
        
        
        // Clear Search Input
        inputsearch.addEventListener("input",e=>{
          if(e.target.value == ''){
            btnclear.style.visibility='hidden';
          }else{
            btnclear.style.visibility='visible';
          }
        });
        
        // Clear
        btnclear.addEventListener("click", e=>{
          inputsearch.value='';
          btnclear.style.visibility = 'hidden';
          let cards = document.querySelectorAll('.tableJob_row');
          liveSearch(cards);
        });
        
        // Create Tag
        function createTagItem(name, id, cat) {
          let a = document.createElement('a');
          a.textContent = name;
          a.setAttribute("data-check", id);
          a.setAttribute("data-category", cat);
          a.setAttribute("href", '#');
          a.setAttribute("class", 'filterTags');
          return a;
        }
        
        // Delete Tag
        function deleteTagItem(t) {
          $.each(optionSelected, function(i) {
            if (optionSelected[i].id === t) {
              optionSelected.splice(i, 1);
              return false;
            }
          });
          document.querySelector('[data-check="' + t + '"]').remove();
          buildTableJobs(optionSelected);
        }
        
        // Unselect Tags
        $(document).on('click', '.filterTags', function (event) {
          
          event.preventDefault();
          console.log(this.getAttribute('data-check'));
          document.getElementById(this.getAttribute('data-check')).checked = false;
          deleteTagItem(this.getAttribute('data-check'));
          
          switch (this.getAttribute('data-category')) {
            case 'teams':
            var totalTeams = $('input[name="optionsTeams[]"]:checked').length;
            if(totalTeams >=1){
              $(".dropdown-text-teams").html('' + totalTeams  + ' teams selected ');
            }else{
              $(".dropdown-text-teams").html('Select a team');
            }
            break;
            case 'locations':
            var totalLocations = $('input[name="optionsLocations[]"]:checked').length;
            if(totalLocations>=1){
              $(".dropdown-text-locations").html('' + totalLocations + ' locations selected ');
            }else{
              $(".dropdown-text-locations").html('Select a location');
            }
            break;
            case 'jobtype':
            var totalJobtype = $('input[name="optionsJobtype[]"]:checked').length;
            if(totalJobtype>=1){
              $(".dropdown-text-jobtype").html('' + totalJobtype + ' Job type selected ');
            }else{
              $(".dropdown-text-jobtype").html('Select a job type');
            }
            break;
          }
          
        });
        
        var allJobTypes = [];
        var allLocations = [];
        var allTeams = [];

        
        response.data.jobs.forEach((obj) => {
          
          const rowElement = document.createElement("tr");
          rowElement.classList.add('tableJob_row');
          
          // Add job classes
          if(obj.hasOwnProperty('metadata')){
            var jobtype = obj.metadata[0].value ?? '';
            if (jobtype != '') { 
              var jobtypeId = jobtype.replaceAll(' ', '').replaceAll('-', '').toLowerCase();
              allJobTypes.push({ id:jobtypeId, class:'jobtype_'+jobtypeId, name:jobtype });
              rowElement.classList.add('jobtype_' + jobtypeId);
            }
          }

          // Add team clasess
          var team_name  = obj.departments[0].name ?? '';
          var team_id = obj.departments[0].id ?? '';
          allTeams.push({ id:team_id , class:'team_'+team_id, name:team_name });
          rowElement.classList.add('team_' + team_id);
          
          // Add location clasess
          obj.offices.forEach((locationObj) => {
            var location_id = locationObj.id;
            var location_name = locationObj.name;
            allLocations.push({ id:location_id , class:'location_'+location_id, name:location_name });
            rowElement.classList.add('location_'+locationObj.id);
          });
          
          rowElement.innerHTML = `
          <td scope="row">
            <p class="title">${obj.title}</p>
            <p class="label">Team: ${obj.departments[0].name}</p>
          </td>
          <td>${jobtype}</td>
          <td>${obj.location.name}</td>
          <td><a href="./job?gh_jid=${obj.id}"class="theButton"><span>Apply Now</span></a></td>`;
          tableBody.appendChild(rowElement);
          
        }); // for each jobs
        
        
        // All Teams
        const teamString = new Set(allTeams.map(JSON.stringify));
        const teamStringsArray = Array.from(teamString);
        const teamObjects = teamStringsArray.map(JSON.parse);
        console.log(teamObjects);
        
        // Add Teams to dropdown
        var listTeams = document.querySelector('#listTeams');
        listTeams.innerHTML = '';
        teamObjects.forEach((item) => {
          listTeams.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
          <input type="checkbox" name='optionsTeams[]' id="team_${item.id}" class="teams_checkbox option justone" value="${item.id}" data-category="teams"/>
          <label class="labelTopic" for="team_${item.id}">
          ${item.name}
          </label>
          </li>`);
        }); 
        
        //  Listener Teams
        $("input[type='checkbox'].teams_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].teams_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          var totalTopics = $('input[name="optionsTeams[]"]:checked').length;
          
          if(totalTopics>=1){
            $(".dropdown-text-teams").html('' + totalTopics + ' teams selected ');
          }else{
            $(".dropdown-text-teams").html('Select a team');
          }

          buildTableJobs(optionSelected);
        });
        

  
        
        //  Remove duplicated Locations
        const ulString = new Set(allLocations.map(JSON.stringify));
        const ulStringsArray = Array.from(ulString);
        const ulObjects = ulStringsArray.map(JSON.parse);
        console.log(ulObjects);
        
        // Add locations to dropdown
        var listLocations = document.querySelector('#listLocations');
        listLocations.innerHTML = '';
        ulObjects.forEach((item) => {
          listLocations.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
          <input type="checkbox" name='optionsLocations[]' id="location_${item.id}" class="locations_checkbox option justone" value="${item.id}" data-category="locations"/>
          <label class="labelTopic" for="location_${item.id}">
          ${item.name}
          </label>
          </li>`);
        }); 
        
        //  Listener Locations
        $("input[type='checkbox'].locations_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].locations_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            console.log($(this).data('category'));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          
          var totalTopics = $('input[name="optionsLocations[]"]:checked').length;
          if(totalTopics>=1){
            $(".dropdown-text-locations").html('' + totalTopics + ' locations selected ');
          }else{
            $(".dropdown-text-locations").html('Select a location');
          }

          buildTableJobs(optionSelected);
        });
        
 
        // All Job Types
        const jbString = new Set(allJobTypes.map(JSON.stringify));
        const jbStringsArray = Array.from(jbString);
        const jbObjects = jbStringsArray.map(JSON.parse);
        console.log(jbObjects);

        // Add Job Types to dropdown
        var listJobTypes = document.querySelector('#listJobtype');
        listJobTypes.innerHTML = '';
        jbObjects.forEach((item) => {
          listJobTypes.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
            <input type="checkbox" name='optionsJobtype[]' id="jobtype_${item.id}" class="jobtype_checkbox option justone checktypejob"  value="${item.id}" data-category="jobtype"/>
            <label class="labelTopic" for="jobtype_${item.id}">${item.name}</label>
          </li>`);
        }); 
        
        // Listener Job Type
        $("input[type='checkbox'].jobtype_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].jobtype_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          var totalJobtype = $('input[name="optionsJobtype[]"]:checked').length;
          
          if(totalJobtype>=1){
            $(".dropdown-text-jobtype").html('' + totalJobtype + ' Job type selected ');
          }else{
            $(".dropdown-text-jobtype").html('Select a job type');
          }
          buildTableJobs(optionSelected);
        });
          
        let cards = document.querySelectorAll('.tableJob_row');
        let typingTimer;               
        let typeInterval = 500;  
        let searchInput = document.getElementById('searchbox');
        searchInput.addEventListener('keyup', () => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(liveSearch(cards), typeInterval);
        }); 
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    }
    loadIntoTable("./get-jobs.php", document.querySelector('table.tableJob'));
  }
});


function buildTableJobs(data) { 
  console.clear();
  console.log(data);

  const tRow = document.querySelectorAll(".tableJob_row");

  tRow.forEach((el) => {
    el.classList.remove('oculto');
  });

  data.forEach((classname) => {
  tRow.forEach((element) => {
      if(element.classList.contains(classname.id)){ }else{ 
        element.classList.add('oculto');
      }
    });
  });
}

function liveSearch(cards) {
  let search_query = document.getElementById("searchbox").value;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i].textContent.toLowerCase()
    .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is-hidden");
    } else {
      cards[i].classList.add("is-hidden");
    }
  }
}



document.addEventListener('DOMContentLoaded', function () { 
  
  if (document.body.classList.contains('bc-job')) {
    
    console.log(document.getElementById("jobId").value);
    let jobId = document.getElementById("jobId").value;
    console.log(jobId);
    
    async function loadInfo(url) {
      
      axios.get(url).then(function (response) {
        
        console.log(response);
        
        const htmlDecode = (input) => {
          const doc = new DOMParser().parseFromString(input, "text/html");
          return doc.documentElement.textContent;
        }
        
        var d = new Date(response.data.updated_at);
        document.getElementById("jobDate").innerHTML =   d.toLocaleString('en-US', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'long', });
        document.getElementById("jobContent").innerHTML = htmlDecode(response.data.content);
        document.getElementById("jobTitle").innerHTML = response.data.title;
        document.getElementById("jobLocation").innerHTML = response.data.location.name;
        document.getElementById("jobTeam").innerHTML = response.data.departments[0].name;
        document.getElementById("jobType").innerHTML = response.data.metadata[0].value ?? '';
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    }
    loadInfo("./get-job.php?id="+jobId);
  }
});



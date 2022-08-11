$(function () {
    // data de prueba para generar rows 
    var fakedata = [
    {
      jobid:1,
      typejob:'permanent',
      type:'Full-time',
      position:'Senior Program Associate, Operations & Quality Assurance, Center on Immigration and Justice, Unaccompanied Children Program',
      team:'Accounting',
      location:'Brooklyn',
      url:'#'
    },
    {
      jobid:2,
      typejob:'temporary',
      type:'Full-time',
      position:'Senior Program Associate, Operations & Quality Assurance, Center on Immigration and Justice, Unaccompanied Children Program',
      team:'Accounting',
      location:'Manhattan',
      url:'#'
    },
    {
      jobid:3,
      typejob:'permanent',
      type:'Full-time',
      position:'Technology and Personnel Security  Compliance Manager, ITS, Acacia Center for justice ( Remote)',
      team:'Human Resources',
      location:'Remote',
      url:'#'
    },
    {
      jobid:4,
      typejob:'permanent',
      type:'Full-time',
      position:'DC Office Intern, Workplace Services',
      team:'Communications&External Affairs',
      location:'Brooklyn',
      url:'#'
    },
    {
      jobid:4,
      typejob:'temporary',
      type:'Full-time',
      position:'DC Office Intern, Workplace Services',
      team:'Communications&External Affairs',
      location:'Brooklyn',
      url:'#'
    },
  ]
    var optionSelected = [];
    const contenttags = document.querySelector('#JobsearchTags');
    const inputsearch = document.querySelector('.contentInput_search');
    const btnclear = document.querySelector('.contentInput__close');
    const tablejobs = document.querySelector('.tableJob');
    const searchbtn = document.querySelector('.contentInput-search');

    if(document.querySelector('.sj-content')){
      // INPUT 
      searchbtn.addEventListener("click", e=>{
        console.log("opciones : ",optionSelected);
        // nota: hay que obtener la info de la api de acuerdo a lo seleccionado y obtener la data para generar la tabla
        buildtableJobs(fakedata);
      });

      btnclear.addEventListener("click", e=>{
        inputsearch.value='';
        btnclear.style.visibility='hidden';
      });

      inputsearch.addEventListener("input",e=>{
          if(e.target.value == ''){
              btnclear.style.visibility='hidden';
          }else{
              btnclear.style.visibility='visible';
          }
      });

      //LOCATIONS
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
    });
    // TEAMS 
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
    });
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
    });
    // unselect tags
    $(document).on('click', '.filterTags', function(event) {

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
    }
    

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
    }



    function buildtableJobs(data) {
      let tbody = tablejobs.querySelector('tbody');
      let newdata = _.groupBy(data, 'typejob');
      tbody.innerHTML = "";
      $(tbody).append(`
        <tr class="tableJob_headline">
                    <th colspan="4" scope="colgroup" class="text-star p-4">Permanent positions</th>
          </tr>
        `);
      newdata.permanent.forEach(inforow => {
        $(tbody).append(`
        <tr class="tableJob_row">
          <td scope="row">
            <p class="title">${inforow.position}</p>
            <p class="label">Team: ${inforow.team}</p>
          </td>
          <td>${inforow.type}</td>
          <td>${inforow.location}</td>
          <td> <a href="${inforow.url}" class="theButton"><span>Apply Now</span></a></td>
        </tr>
        `)
      });
      $(tbody).append(`
        <tr class="tableJob_headline">
                    <th colspan="4" scope="colgroup" class="text-star p-4">Temporary positions</th>
          </tr>
        `)
      newdata.temporary.forEach(inforow => {
        $(tbody).append(`
        <tr class="tableJob_row">
          <td scope="row">
            <p class="title">${inforow.position}</p>
            <p class="label">Team: ${inforow.team}</p>
          </td>
          <td>${inforow.type}</td>
          <td>${inforow.location}</td>
          <td> <a href="${inforow.url}" class="theButton"><span>Apply Now</span></a></td>
        </tr>
        `)
      });
    }
    
      
});
 
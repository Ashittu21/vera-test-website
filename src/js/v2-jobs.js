
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

          var d = new Date(response.data.updated_at);
          document.getElementById("jobDate").innerHTML = d.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            year: 'numeric',
            month: 'long',
          });
          document.getElementById("jobContent").innerHTML = htmlDecode(response.data.content);
          document.getElementById("jobTitle").innerHTML = response.data.title;
          document.getElementById("jobLocation").innerHTML = response.data.location.name;
          document.getElementById("jobTeam").innerHTML = response.data.departments[0].name;
          document.getElementById("jobType").innerHTML = response.data.metadata[0].value ?? '';

          buildForm(response.data.questions, 'formJob');
          setFormActionUrl("formContainer", jobId);
          generateMarkup(response.data.compliance, 'formContainer');

          const fileInputs = document.querySelectorAll('input[type="file"]');
          fileInputs.forEach(fileInput => {
            fileInput.addEventListener('change', async () => {
              const inputName = fileInput.name;
              const file = fileInput.files[0];
              await encodeFileToBase64(file, inputName);
              console.log(`File ${file.name} uploaded`);
            });
          });





          const resumeInput = document.getElementsByName('resume')[0];
          const resumeToggle = document.getElementsByClassName('toggleText')[0];
          const resumeText = document.getElementsByName('resume_text')[0];

          // Add event listener to resumeToggle link
          resumeToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Toggle display of resumeText
            if (resumeText.style.display === 'none') {
              resumeText.style.display = 'block';
              resumeText.required = true; // Make resumeText mandatory
              resumeInput.required = false; // Make resumeInput not mandatory

              var contentInputs = document.querySelectorAll('[name="resume_content"]');
              var filenameInputs = document.querySelectorAll('[name="resume_content_filename"]');

              contentInputs.forEach(function (element) {
                element.remove();
              });

              filenameInputs.forEach(function (element) {
                element.remove();
              });

            } else {
              resumeText.style.display = 'none';
              resumeText.required = false; // Make resumeText not mandatory
              resumeInput.required = true; // Make resumeInput mandatory
            }
          });

          // Add event listener to resumeInput
          resumeInput.addEventListener('change', () => {
            // Hide resumeText if file is selected
            resumeText.style.display = 'none';
            resumeText.required = false; // Make resumeText not mandatory
            resumeInput.required = true; // Make resumeInput mandatory
          });

          const coverLetterInput = document.getElementsByName('cover_letter')[0];
          const coverLetterToggle = document.getElementsByClassName('toggleText')[1];
          const coverLetterText = document.getElementsByName('cover_letter_text')[0];

          // Add event listener to coverLetterToggle link
          coverLetterToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Toggle display of coverLetterText
            if (coverLetterText.style.display === 'none') {
              coverLetterText.style.display = 'block';
              coverLetterText.required = true; // Make coverLetterText mandatory
              coverLetterInput.required = false; // Make coverLetterInput not mandatory
              coverLetterInput.value = "";

              var contentInputs = document.querySelectorAll('[name="cover_letter_content"]');
              var filenameInputs = document.querySelectorAll('[name="cover_letter_content_filename"]');

              contentInputs.forEach(function (element) {
                element.remove();
              });

              filenameInputs.forEach(function (element) {
                element.remove();
              });


            } else {
              coverLetterText.style.display = 'none';
              coverLetterText.required = false; // Make coverLetterText not mandatory
              coverLetterInput.required = true; // Make coverLetterInput mandatory
            }
          });

          // Add event listener to coverLetterInput
          coverLetterInput.addEventListener('change', () => {
            coverLetterText.style.display = 'none';
            coverLetterText.required = false; // Make coverLetterText not mandatory
            coverLetterInput.required = true; // Make coverLetterInput mandatory
          });


          addSubmitButtonToForm('formContainer');

        
        
        
          const submitJobForm = document.getElementById('submitJobForm');
/*
          submitJobForm.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get form data
            const form = document.getElementById('formContainer');
            const formData = new FormData(form);

            // Send form data with Axios
            axios.post(form.action, formData)
              .then(response => {
                if (response.data.success) {
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.textContent = response.data.success;
                  form.insertAdjacentElement('afterend', successMessage);
                }
              })
              .catch(error => console.error(error));
          });*/
/*
          submitJobForm.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get form data
            const form = document.getElementById('formContainer');
            const formData = new FormData(form);
          
            // Validate required fields
            let allRequiredFieldsHaveValue = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
              if (!formData.get(field.name)) {
                // Field is required but has no value
                allRequiredFieldsHaveValue = false;
                field.classList.add('error'); // add error class to show error style
          
                // Add event listener to remove error class on input
                field.addEventListener('input', () => {
                  if (formData.get(field.name)) {
                    field.classList.remove('error'); // remove error class if field has value
                  }
                });
              } else {
                field.classList.remove('error'); // remove error class if previously added
              }
            });
          
            if (!allRequiredFieldsHaveValue) {
              return; // stop execution if any required field is empty
            }
          
            // Send form data with Axios
            axios.post(form.action, formData)
            .then(response => {
              if (response.data.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = response.data.success;
                form.insertAdjacentElement('afterend', successMessage);
              } else if (response.status === 422 && response.data.error === "Invalid attributes: email") {
                // Show email error message
                const errorMessage = document.createElement('div');
                errorMessage.textContent = "Invalid email address";
                form.insertAdjacentElement('afterend', errorMessage);
              }
            })
            .catch(error => console.error(error));
          });
        */
        
        
         /*
          submitJobForm.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get form data
            const form = document.getElementById('formContainer');
            const formData = new FormData(form);
          
            // Validate required fields
            let allRequiredFieldsHaveValue = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
              if (!formData.get(field.name)) {
                // Field is required but has no value
                allRequiredFieldsHaveValue = false;
                field.classList.add('error'); // add error class to show error style
          
                // Add event listener to remove error class on input
                field.addEventListener('input', () => {
                  if (formData.get(field.name)) {
                    field.classList.remove('error'); // remove error class if field has value
                  }
                });
              } else {
                field.classList.remove('error'); // remove error class if previously added
              }
            });
          
            if (!allRequiredFieldsHaveValue) {
              return; // stop execution if any required field is empty
            }
          
            // Send form data with Axios
            axios.post(form.action, formData)
              .then(response => {
                if (response.data.success) {
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.textContent = response.data.success;
                  form.insertAdjacentElement('afterend', successMessage);
                }
              })
              .catch(error => {
                if (error.response && error.response.status === 422 && error.response.data.error) {
                  // Show error message
                  const errorMessage = document.createElement('div');
                  errorMessage.textContent = error.response.data.error;
                  form.insertAdjacentElement('afterend', errorMessage);
                } else {
                  console.error(error);
                }
              });
          });*/
          
          const formMessage = document.getElementById('formMessage');

          submitJobForm.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get form data
            const form = document.getElementById('formContainer');
            const formData = new FormData(form);
          
            // Validate required fields
            let allRequiredFieldsHaveValue = true;
            const requiredFields = form.querySelectorAll('[required]');
            const invalidFields = [];
            requiredFields.forEach(field => {
              if (!formData.get(field.name)) {
                // Field is required but has no value
                allRequiredFieldsHaveValue = false;
                field.classList.add('error'); // add error class to show error style
                invalidFields.push(field.getAttribute('data-name')); // add field name to invalid fields array
          
                // Add event listener to remove error class on input
                field.addEventListener('input', () => {
                  if (formData.get(field.name)) {
                    field.classList.remove('error'); // remove error class if field has value
                    invalidFields.splice(invalidFields.indexOf(field.getAttribute('data-name')), 1); // remove field from invalid fields array
                  }
                });
              } else {
                field.classList.remove('error'); // remove error class if previously added
              }
            });
          
            if (!allRequiredFieldsHaveValue) {
              formMessage.classList.add('errorForm');
              formMessage.innerHTML = `Please fill in the following required fields: ${invalidFields.join(', ')}.`;
              return; // stop execution if any required field is empty
            }
          
            // Send form data with Axios
            axios.post(form.action, formData)
              .then(response => {
                if (response.data.success) {
                  // Show success message
                  formMessage.classList.remove('errorForm');
                  formMessage.classList.add('successForm');
                  //formMessage.innerHTML = response.data.success;
                  form.setAttribute('style', 'display:none;');
                  formMessage.innerHTML = '<strong>Thank you for applying.</strong><br>Your application has been received. If there is a fit, someone will be getting back to you.';
                }
              })
              .catch(error => {
                if (error.response && error.response.status === 422 && error.response.data.error) {
                  // Show error message
                  const errorMessage = document.createElement('div');
                  errorMessage.classList.add('errorForm');
                  errorMessage.textContent = error.response.data.error;
                  formMessage.innerHTML = '';
                  formMessage.appendChild(errorMessage);
                } else {
                  console.error(error);
                }
              });
          });
          

        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
    loadInfo("./get-job.php?id=" + jobId);
  }
});

function buildForm(json, containerId) {
  const container = document.getElementById(containerId);
  json.forEach(question => {
    //console.log(question.name);
    const questionDiv = document.createElement('div');
    questionDiv.className = 'col-md-6';
    questionDiv.classList.add('input-group');

    const label = document.createElement('label');
    label.textContent = question.label;

    const fields = question.fields.map(field => {
      const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');

      if (field.type === 'input_file') {
        input.type = 'file';
      } else {
        input.type = field.type;
      }

      if (field.type === 'textarea') {
        input.style.display = 'none';
      }

      input.name = field.name;
      input.placeholder = field.placeholder || '';
      input.required = question.required;
      input.setAttribute('data-name', question.label);
      return input;
    });

    fields.forEach(field => {
      questionDiv.appendChild(field);
    });

    if (question.fields.some(field => field.type === 'input_file')) {
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'toggleText';
      link.textContent = 'Attach or enter manually';
      questionDiv.appendChild(link);
    }

    questionDiv.insertBefore(label, fields[0]);

    container.appendChild(questionDiv);

  });
}

const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function generateMarkup(json, containerId) {

  const container = document.getElementById(containerId);
  let markup = '';
  console.log(json);
  for (let i = json.length - 1; i >= 0; i--) {
    const item = json[i];

    if (item.description) {
      const div = document.createElement('div');
      div.classList.add('compilance', 'col-md-12');
      div.innerHTML = htmlDecode(item.description);
      container.appendChild(div);
    }

    if (item.questions.length > 0) {

      const form = document.createElement('div');

      item.questions.forEach(question => {
        const div = document.createElement('div');
        div.classList.add('selectForm');
        const label = document.createElement('label');
        label.textContent = question.label === 'Race' ? 'Are you Hispanic/Latino?' :
          question.label === 'Gender' ? 'Gender' :
          question.label === 'VeteranStatus' ? 'Veteran Status' :
          question.label === 'DisabilityStatus' ? 'Disability Status' : question.label;


        div.appendChild(label);
        question.fields.forEach(field => {
          let input;
          switch (field.type) {
            case 'multi_value_single_select':
              input = document.createElement('select');
              input.name = field.name;
              input.classList.add('select-css');
              field.values.forEach(value => {
                const option = document.createElement('option');
                option.value = value.value;
                option.textContent = value.label;
                input.appendChild(option);
              });
              break;
          }
          div.appendChild(input);
        });
        form.appendChild(div);
      });
      container.appendChild(form);
    }
  };
}

function setFormActionUrl(formId, idParameter) {
  // Construct the URL using the idParameter
  var url = "./post-job.php";
  // Get the form element
  var form = document.getElementById(formId);
  var jobID = document.getElementById("idJobInput");
  jobID.value = idParameter;
  form.action = url;
}

function encodeFileToBase64(file, inputName) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileName = file.name;
      const base64EncodedData = reader.result.split(',')[1];
      const contentInput = document.querySelector(`input[name="${inputName}_content"]`);
      if (contentInput) {
        contentInput.value = base64EncodedData;
      } else {
        const contentInput = document.createElement('input');
        contentInput.type = 'hidden';
        contentInput.name = `${inputName}_content`;
        contentInput.value = base64EncodedData;
        const fileInput = document.querySelector(`input[name="${inputName}"]`);
        fileInput.insertAdjacentElement('afterend', contentInput);
      }
      const filenameInput = document.querySelector(`input[name="${inputName}_content_filename"]`);
      if (filenameInput) {
        filenameInput.value = fileName;
      } else {
        const filenameInput = document.createElement('input');
        filenameInput.type = 'hidden';
        filenameInput.name = `${inputName}_content_filename`;
        filenameInput.value = fileName;
        const contentInput = document.querySelector(`input[name="${inputName}_content"]`);
        contentInput.insertAdjacentElement('afterend', filenameInput);
      }
      resolve({ fileName, base64EncodedData });
    };
    reader.onerror = error => reject(error);
  });
}

function addSubmitButtonToForm(formId) {
  // Get a reference to the form element
  const form = document.getElementById(formId);

  // Create the button element and set its attributes
  const button = document.createElement('button');
  button.id = 'submitJobForm';
  button.classList.add('button', 'button-2x', 'orange');
  button.innerHTML = '<span>Submit Application</span>';

  // Create a div element and set its class name
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  // Append the button to the actions div
  actionsDiv.appendChild(button);

  // Add the actions div to the end of the form
  form.appendChild(actionsDiv);
}


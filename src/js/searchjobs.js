$(function () {
    var optionSelected = [];
    const contenttags = document.querySelector('#JobsearchTags');
    const inputsearch = document.querySelector('.contentInput_search');
    const btnclear = document.querySelector('.contentInput__close');


    btnclear.addEventListener("click", e=>{
        inputsearch.value='';
    })

    inputsearch.addEventListener("input",e=>{
        if(e.target.value == ''){
            btnclear.style.visibility='hidden';
        }else{
            btnclear.style.visibility='visible';
        }
    })

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
    // INPUT 


    //LOCATIONS
    $("input[type='checkbox'].locations_checkbox").change(function() {
  
        var a = $("input[type='checkbox'].locations_checkbox");
        if ($(this).is(':checked')) {
          optionSelected.push({
            label: $(this).next().text().trim(),
            id: $(this).attr('id'),
            category: $(this).data('category'),
          });
          console.log(optionSelected);
      
          contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
          console.log($(this).data('category'));
      
        } else {
          deleteTagItem($(this).attr('id'));
        }
      
        console.log(optionSelected);
      
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
          console.log(optionSelected);
      
          contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
          console.log($(this).data('category'));
      
        } else {
          deleteTagItem($(this).attr('id'));
        }
      
        console.log(optionSelected);
      
        var totalTopics = $('input[name="optionsTeams[]"]:checked').length;
      
        if(totalTopics>=1){
         $(".dropdown-text-teams").html('' + totalTopics + ' teams selected ');
        }else{
         $(".dropdown-text-teams").html('Select a team');
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
            console.log(totalTeams );
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
        }
            
      });

});
 
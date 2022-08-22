$(function () {
 
  const searchbtn = document.querySelector('.contentInput-search');

    if(document.querySelector('.sj-content')){
      // INPUT 
      searchbtn.addEventListener("click", e=>{
        console.log("opciones : ", optionSelected);
      //  buildtableJobs(fakedata);
      });


    }
    

    function buildtableJobs(data) {
      let tbody = tablejobs.querySelector('tbody');
    //  let newdata = _.groupBy(data, 'typejob');
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
 

document.addEventListener('DOMContentLoaded', function () { 

  if (document.body.classList.contains('bc-careers')){ 
  async function loadIntoTable(url, table){
    const tableBody = table.querySelector('tbody');
      axios.get(url).then(function (response) {
      response.data.jobs.forEach((obj) => {
        const rowElement = document.createElement("tr");
        rowElement.classList.add('tableJob_row');
        rowElement.innerHTML = `
        <td scope="row">
          <p class="title">${obj.title}</p>
          <p class="label">Team: ${obj.departments[0].name}</p>
        </td>
        <!--<td>Full Time</td> -->
        <td>${obj.location.name}</td>
        <td><a href="./job?gh_jid=${obj.id}"class="theButton"><span>Apply Now</span></a></td>`;
        tableBody.appendChild(rowElement);
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
        document.getElementById("jobTeam").innerHTML   = response.data.departments[0].name;
      
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



'use strict';document.addEventListener('DOMContentLoaded',function(){if(document.body.classList.contains('bc-careers')){var loadIntoTable=async function loadIntoTable(url,table){var tableBody=table.querySelector('tbody');axios.get(url).then(function(response){response.data.jobs.forEach(function(obj){var rowElement=document.createElement("tr");rowElement.classList.add('tableJob_row');rowElement.innerHTML='\n        <td scope="row">\n          <p class="title">'+obj.title+'</p>\n          <p class="label">Team: '+obj.departments[0].name+'</p>\n        </td>\n        <td>Full Time</td>\n        <td>'+obj.location.name+'</td>\n        <td><a href="./job?gh_jid='+obj.id+'"class="theButton"><span>Apply Now</span></a></td>';tableBody.appendChild(rowElement);});}).catch(function(error){console.log(error);}).then(function(){});};loadIntoTable("./get-jobs.php",document.querySelector('table.tableJob'));}});document.addEventListener('DOMContentLoaded',function(){if(document.body.classList.contains('bc-job')){var loadInfo=async function loadInfo(url){axios.get(url).then(function(response){console.log(response);var htmlDecode=function htmlDecode(input){var doc=new DOMParser().parseFromString(input,"text/html");return doc.documentElement.textContent;};var d=new Date(response.data.updated_at);document.getElementById("jobDate").innerHTML=d.toLocaleString('en-US',{weekday:'short',// long, short, narrow
day:'numeric',// numeric, 2-digit
year:'numeric',// numeric, 2-digit
month:'long'// numeric, 2-digit, 
});document.getElementById("jobContent").innerHTML=htmlDecode(response.data.content);document.getElementById("jobTitle").innerHTML=response.data.title;document.getElementById("jobLocation").innerHTML=response.data.location.name;document.getElementById("jobTeam").innerHTML=response.data.departments[0].name;}).catch(function(error){console.log(error);}).then(function(){});};console.log(document.getElementById("jobId").value);var jobId=document.getElementById("jobId").value;console.log(jobId);loadInfo("./get-job.php?id="+jobId);}});
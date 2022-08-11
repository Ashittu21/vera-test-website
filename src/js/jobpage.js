$(function () {
  // Drag and frop files
  const Resumefile = document.querySelector('#resumefile');
  const coverletterfile = document.querySelector('#coverfile');
  const formApply = document.querySelector('#formapply_job');

  if(formApply){
    if(Resumefile){
      var resumepond = FilePond.create(Resumefile,{
        labelIdle: `<i class="fas fa-paperclip"></i> Browse your resume or  <span class="filepond--label-action">just drop it here</span>`
      });
    }
    if(coverletterfile){
      var coverpond = FilePond.create(coverletterfile,{
        labelIdle: `<i class="fas fa-paperclip"></i> Browse your cover letter or  <span class="filepond--label-action">just drop it here</span>`
      });
    }
    formApply.addEventListener('submit',e=>{
      e.preventDefault();
      let files = resumepond.getFiles();
      console.log("files ",files);
      alert("form submit");
    })
  }

  


});
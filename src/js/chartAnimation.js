let acharts =  document.querySelectorAll(".achart");

function mostrarScroll(){
  let scrollTop = document.documentElement.scrollTop;
  for (var i=0; i < acharts.length; i++ ){
    let alturaAnimado = acharts[i].offsetTop;
    if(alturaAnimado - 30 < scrollTop){
      acharts[i].style.display = "block";
    }
  }
}

window.addEventListener('scroll', mostrarScroll)
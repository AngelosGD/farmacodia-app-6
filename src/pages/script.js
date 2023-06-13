const navbarShowBtn = document.querySelector('.navbar-show-btn')
const navbarCollapseDiv = document.querySelector('.navbar-collapse')
const navbarHideBtn = document.querySelector('.navbar-hiden-btn')

/* mostrar el menu en responsive */
navbarShowBtn.addEventListener('click', function(){
        navbarCollapseDiv.classList.add('navbar-show')
    })


    /* Ocultar menu en responsive */
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show')
})





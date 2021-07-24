const mainMenu = document.querySelector('.header__nav-list');
const openMenu = document.querySelector('.nav__menu');
const openIcon = document.querySelector('.nav__line');






openMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('active')
    openMenu.classList.toggle('active')
    openIcon.classList.toggle('active')
    
});




const mainMenu = document.querySelector('.header__nav-list');
const openMenu = document.querySelector('.nav__menu');






openMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('active')
});


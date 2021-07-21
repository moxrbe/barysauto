const mainMenu = document.querySelector('.header__nav-list');
const openMenu = document.querySelector('.nav__menu');
const closeMenu = document.querySelector('.nav__close');





openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
    console.log(show);
}
function close(){
    mainMenu.style.top = '-100%';
    console.log(close);
}

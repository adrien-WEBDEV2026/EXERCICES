document.addEventListener('DOMContentLoaded', function() {
    const menuFlex = document.getElementById('menu-flex');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', function() {
        menuFlex.classList.toggle('menu--open');
        menu.classList.toggle('menu-col')
    });
});
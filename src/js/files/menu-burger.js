const iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    console.log(menuBody)
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}
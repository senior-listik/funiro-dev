import { isMobile } from "/src/js/modules/functions.js";
import { _removeClasses } from "/src/js/modules/functions.js";
import { inputPlaceholderValue } from "/src/js/modules/functions.js";
inputPlaceholderValue()

window.onload = function () {
    document.addEventListener("click", documentActions);
    // Actions (делегирование события click)
    function documentActions(e) {
        const targetElement = e.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                _removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
            }
        }
        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetElement.closest('.menu__item') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
        }

    }
    
}
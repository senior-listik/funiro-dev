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
    
    // Спойлери
    const spollersArray = document.querySelectorAll('[data-spollers]');
        if (spollersArray.length > 0) {
            // Отримуємо звичайні спойлери
            const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            })
            // Ініціалізуємо звичайні спойлери
            if (spollersRegular.length > 0) {
                initSpollers(spollersRegular);
            }

            // Отримуємо спойлери з медіазапитами
            const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
                return item.dataset.spollers.split(",")[0];
            })
            
            // Ініціалізуємо спойлери з медіазапитами
            if (spollersMedia.length > 0) {
                const breakpointsArray = [];
                spollersMedia.forEach(item => {
                    const params = item.dataset.spollers;
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint)
                    console.log(breakpointsArray)
                });
            // Отримуємо унікальні брейкпоінти
                let mediaQueries = breakpointsArray.map(function (item) {
                    return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
                })
                mediaQueries = mediaQueries.filter(function (item, index, self){
                    return self.indexOf(item) === index;
                });
                // Робота з кожним брейкпоінтом
                mediaQueries.forEach(breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);

                    // Об'єкти з необхідними умовами
                    const spollersArray = breakpointsArray.filter(function (item) {
                        if (item, value === mediaBreakpoint && item.type === mediaType) {
                            return true;
                        }
                    });
                    // Подія
                    matchMedia.addEventListener(function () {
                        initSpollers(spollersArray, matchMedia);
                    });
                    initSpollers(spollersArray, matchMedia);
                });
            }

            // Ініціалізація
            function initSpollers (spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add('_init');
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove('_init');
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                })  
            }
        }
    }

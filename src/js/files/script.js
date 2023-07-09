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
            
            // // Отримуємо звичайні спойлери
            // const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            //     return !item.dataset.spollers.split(",")[0];
            // })
            // // Ініціалізуємо звичайні спойлери
            // if (spollersRegular.length > 0) {
            //     initSpollers(spollersRegular);
            // }

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
                        
                        if (item.value === mediaBreakpoint && item.type === mediaType) {
                            return true;
                        }
                    });
                    // Подія
                    matchMedia.addListener(function () {
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

            // Робота з контентом
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
                if (spollerTitles.length > 0) {
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute('tabindex');
                            if (!spollerTitle.classList.contains('_active')) {
                                spollerTitle.nextElementSibling.hidden = true;
                            }
                        } else {
                            spollerTitle.setAttribute('tabindex', '-1');
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    })
                }
            }

            function setSpollerAction(e) {
                const el = e.target;
                if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                    const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                    const spollersBlock = spollerTitle.closest('[data-spollers]');
                    const oneSpoller = spollersBlock.hasAttribute('data-spoller') ? true : false;
                    if (!spollersBlock.querySelectorAll('._slide').length) {
                        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                            hideSpollersBody(spollersBlock);
                        }
                        spollerTitle.classList.toggle('_active');
                        _slideToggle(spollerTitle.nextElementSibling, 500);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
                if (spollerActiveTitle) {
                    spollerActiveTitle.classList.remove('_active');
                    _slideUp(spollerActiveTitle.nextElementSibling, 500);
                }
            }
        }
    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration)
        }
    }
}

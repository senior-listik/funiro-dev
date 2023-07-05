export function isWebp() {
   function testWebP(callback) {

var webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
document.querySelector('body').classList.add('webp');
}else{
document.querySelector('body').classList.add('no-webp');
}
}); 
}

export const inputPlaceholderValue = () => {
   // Получаем поле ввода
   const input = document.querySelector('.search-form__input');

   // Устанавливаем значение поля ввода на основе атрибута data-value
   input.placeholder = input.getAttribute('data-value');
}

export const isMobile = { Android: () => navigator.userAgent.match(/Android/i), BlackBerry: () => navigator.userAgent.match(/BlackBerry/i), iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i), Opera: () => navigator.userAgent.match(/Opera Mini/i), Windows: () => navigator.userAgent.match(/IEMobile/i), any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) };

export const _removeClasses = (nodes, className) => nodes.forEach(node => node.classList.remove(className));

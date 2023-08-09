import { isMobile } from "/src/js/modules/functions.js";
import { _removeClasses } from "/src/js/modules/functions.js";
import { inputPlaceholderValue } from "/src/js/modules/functions.js";
import { _ibg } from "/src/js/modules/functions.js";
inputPlaceholderValue();
 _ibg();
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
        if (targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            e.preventDefault();
        }
        if (targetElement.classList.contains('actions-product__button')) {
            
            const productId = targetElement.closest('.item-product').dataset.pid;
            addToCard(targetElement, productId);
            e.preventDefault();
        }
    }
    // header
    const headerElement = document.querySelector('.header');

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');
        }
    }
console.log(document.querySelector('.actions-product__button'))
    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);

    async function getProducts(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = "json/products.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            } else {
                alert("Error");
            }
        }
    }

    function loadProducts(data) {
        const productsItems = document.querySelector('.products__items');
        data.products.forEach(item => {
            const productId = item.id;
            const productUrl = item.url;
            const productImage = item.image;
            const productTitle = item.title;
            const productText = item.text;
            const productPrice = item.price;
            const productOldPrice = item.priceOld;
            const productShareUrl = item.shareUrl;
            const productLikeUrl = item.likeUrl;
            const productLabels = item.labels;

            let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
            let productTemplateEnd = `</article>`;

            let productTemplateLabels = '';
            if (productLabels) {
                let productTemplateLabelsStart = `<div class="item-product__labels">`;
                let productTemplateLabelsEnd = `</div>`;
                let productTemplateLabelsContent = '';

                productLabels.forEach(labelItem => {
                    productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
                });
                
                productTemplateLabels += productTemplateLabelsStart;
                productTemplateLabels += productTemplateLabelsContent;
                productTemplateLabels += productTemplateLabelsEnd;
            }

            let productTemplateImage = `
            <a href="${productUrl}" class="item-product__image _ibg">
                <img src="img/products/${productImage}" alt="${productTitle}">
            </a>
            `;

            let productTemplateBodyStart = `<div class="item-product__body">`;
            let productTemplateBodyEnd = `</div>`;

            let productTemplateContent = `
            <div class="item-product__content">
                <h3 class="item-product__title">${productTitle}</h3>
                <div class="item-product__text">${productText}</div>
            `;

            let productTemplatePrices = '';
            let productTemplatePricesStart = `<div class="item-product__prices">`;
            let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
            let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
            let productTemplatePricesEnd = `</div>`;

            productTemplatePrices = productTemplatePricesStart;
            productTemplatePrices += productTemplatePricesCurrent;
            if (productOldPrice) {
                productTemplatePrices += productTemplatePricesOld;
            }
            productTemplatePrices += productTemplatePricesEnd;

            let productTemplateActions = `
              <div class="item-product__actions actions-product"> 
                    <div class="actions-product__body"> 
                      <a class="actions-product__button btn btn_white" href="">Add to cart</a>
                      <a class="actions-product__link _icon-share" href="${productShareUrl}">Share</a>
                      <a class="actions-product__link _icon-favorite" href="${productLikeUrl}">Like</a>
                    </div>
                  </div>  
            `;

            let productTemplateBody = '';
            productTemplateBody += productTemplateBodyStart;
            productTemplateBody += productTemplateContent;
            productTemplateBody += productTemplatePrices;
            productTemplateBody += productTemplateActions;
            productTemplateBody += productTemplateBodyEnd;
            
            let productTemplate = '';
            productTemplate += productTemplateStart;
            productTemplate += productTemplateLabels;
            productTemplate += productTemplateImage;
            productTemplate += productTemplateBody;
            productTemplate += productTemplateEnd;


            productsItems.insertAdjacentHTML('beforeend', productTemplate)
             _ibg();
        });
    }
    
    function addToCard(productButton, productId) {
        
        if (!productButton.classList.contains('_hold')) {
            
            productButton.classList.add('_hold');
            productButton.classList.add('_fly');

            const cart = document.querySelector('.cart-header__icon');
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const productImage = product.querySelector('.item-product__image');

            const productImageFly = productImage.cloneNode(true);

            const productImageFlyWidth = productImage.offsetWidth;
            const productImageFlyHeight = productImage.offsetHeight;
            const productImageFlyTop = productImage.getBoundingClientRect().top;
            const productImageFlyLeft = productImage.getBoundingClientRect().left;

            productImageFly.setAttribute('class', '_flyImage _ibg');
            
            productImageFly.style.cssText = `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
            `;
            
            document.body.append(productImageFly);

            const cartFlyLeft = cart.getBoundingClientRect().left;
            const cartFlTop = cart.getBoundingClientRect().top;

            productImageFly.style.cssText = `
            left: ${cartFlyLeft}px;
            top: ${cartFlTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
            `;
            _ibg();

            productImageFly.addEventListener('transitionend', function () {
               
                if (productButton.classList.contains('_fly')) {
                     
                    productImageFly.remove();
                    updateCart(productButton, productId);
                    productButton.classList.remove('_fly');
                }
            })
        }
    }

    function updateCart(productButton, productId, productAdd = true) {
        const cart = document.querySelector('.cart-header');
        const cartIcon = cart.querySelector('.cart-header__icon');
        const cartQuantity = cartIcon.querySelector('span');
        const cartProduct = document.querySelector(`[data-cart-pid="${productId}]`);
        const cartList = document.querySelector('.cart-list');

        // add
        if (productAdd) {
            
            if (cartQuantity) {
                cartQuantity.innerHTML = ++cartQuantity.innerHTML;
            } else {
                cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
            }
        }
    }
}

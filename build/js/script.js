const shoppingCart = ( _ =>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCart = (product) => {
        if (cart.find(cartItem => cartItem.id === product.id)){
            alert('item already in cart');
            return;
        }
        cart.push(product);
    }

    const removeCartItem = id => {
        cart = cart.filter(cartItem => cartItem.id !== id);
    }

    const getcart = _ => cart

    return{
        addToCart,
        removeCartItem,
        getcart
    }
})();

const displayController = (() =>{
    const product = document.querySelectorAll('#product')

    const openMenu = document.querySelector('[data-open]');
    const closeMenu = document.querySelector('[data-close]');
    const mobileMenu = document.querySelector('#mobile-menu');

    const cartContainer = document.querySelector('#cart');
    const cartNotif = document.querySelector('#cart-notif');
    const cartIcon = document.querySelector('#cart-icon');
    const cartItemDiv = document.querySelector('#cart-items');

    const slider = document.querySelector('#slider');

    const lightbox = document.querySelector('#lightbox');
    const closeModal = document.querySelector('#close-modal');

    const mainSlides = document.querySelectorAll("[data-slide]");
    const overlaySlides = document.querySelectorAll("[data-overlay-slide]");
    const thumbnails = document.querySelectorAll("[data-thumbnail]");
    
    const prevBtn = document.querySelectorAll("[data-prev]");
    const nextBtn = document.querySelectorAll("[data-next]");

    const addBtn = document.querySelector('[data-plus]')
    const subtractBtn = document.querySelector('[data-minus]')
    const counterEl = document.querySelector('#counter')

    const handleMobileMenu = ( _ => {
        const toggleMenu = ()=>{
            const isOpened = openMenu.getAttribute('aria-expanded') === "true";
            isOpened ? close() : open()
        }
    
        const close = () =>{
            closeMenu.setAttribute('aria-expanded', false);
            openMenu.setAttribute('aria-expanded', false);
            mobileMenu.classList.add('hidden');
        }
    
        const open = () =>{
            closeMenu.setAttribute('aria-expanded', true);
            openMenu.setAttribute('aria-expanded', true);
            mobileMenu.classList.remove('hidden');
        }
    
        openMenu.addEventListener('click', toggleMenu);
        closeMenu.addEventListener('click', toggleMenu);

    })();

    const handleCartDisplay = (_ =>{
        cartIcon.addEventListener('click', ()=>{
            cartContainer.classList.toggle('hidden')
            updateCart();
        })

        cartContainer.addEventListener('click', (e)=> {
            if(e.target.classList.contains('delete-icon')){
                shoppingCart.removeCartItem(e.target.id);
                updateCart()
            }
        })

        product.forEach(item => 
            item.addEventListener('click', (e)=>{
                if (e.target.dataset.cart === 'true'){
                    if(handleCount.getcount() === 0){
                        alert('please select the quantity');
                        return;
                    }
                    const cartItem = {
                        productImg: item.querySelector('#product-img').src,
                        productName: item.querySelector('#product-name').textContent,
                        productPrice: parseInt(item.querySelector('#product-price').textContent),
                        id: item.querySelector('[data-cart]').id,
                        numberOfItems: handleCount.getcount(),
                    }
                    shoppingCart.addToCart(cartItem);
                    updateCart()
                }
            })
        )
            
        const renderCart = _ => {
            const cart = shoppingCart.getcart();
            //save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart))
            cartItemDiv.innerHTML = "";
            if(cart.length < 1){
                cartItemDiv.innerHTML += `
                <p class="-text--clr-neutral-grayblue-400       font-kumbh-Sans font-bold">Your cart is empty.</p>
                `
                document.querySelector('#checkout').classList.add('hidden');
            }else{
                cart.forEach( item =>{ 
                    cartItemDiv.innerHTML += `
                        <div class="flex justify-between items-center">
                            <div class="w-14 h-14 rounded-lg overflow-hidden "><img src=${item.productImg} alt="Thumbnail of sneaker on display" class="cursor-pointer w-full h-full object-cover"></div>
                            <div class="-text--clr-neutral-grayblue-400   text-left font-kumbh-Sans ">
                            <p>${item.productName}</p>
                            <p>$${item.productPrice} x ${item.numberOfItems} <span class="font-[700] text-black">$${item.numberOfItems * item.productPrice}</span></p>
                            </div>
                            <div>
                            <img id="${item.id}" src="images/icon-delete.svg" alt="delete item from cart" class="delete-icon cursor-pointer">
                            </div>
                        </div>
                    `
                })
                document.querySelector('#checkout').classList.remove('hidden');
            }
        }

        const updateCartNotif = _ =>{
            const cart = shoppingCart.getcart();
            // try{
            //     cartNotif.classList.add('cart-notif')
            //     cartNotif.textContent = cart.map(cartItem => cartItem.numberOfItems).reduce((a,b) => a + b)
            // }catch(error){
            //     console.error(error);
            //     cartNotif.classList.remove('cart-notif');
            //     cartNotif.textContent = '';
            // }

            if(cart.length > 0){
                cartNotif.classList.add('cart-notif')
                cartNotif.textContent = cart.map(cartItem => cartItem.numberOfItems).reduce((a,b) => a + b)
            }else{
                cartNotif.classList.remove('cart-notif');
                cartNotif.textContent = '';
            }
        }

        const updateCart = _ =>{
            updateCartNotif()
            renderCart();
        }

    })()
    


    const handleLightbox = ( _ =>{

        slider.addEventListener('click', ()=>{
            lightbox.classList.add('sm:grid');
        })
        
        closeModal.addEventListener('click', ()=>{
            lightbox.classList.remove('sm:grid');
        })

        thumbnails.forEach(thumbnail => {
            //give the first thumbnail the active class by default//
                thumbnails[0].classList.add('active-thumbnail');
            thumbnail.addEventListener('click', (e)=>{
                //this binding keeps track of the index of the thumbnail that was clicked by extracting the index value of the thumbnail that was manually asssigned in the HTML//
                let currentSlide =  e.target.dataset.thumbnail

                mainSlides.forEach((slide, index) => {
                    //here we use a recurring function call in this program but in this case we can easily keep track of the thumbnail index that was clicked with 'e.target.dataset.thumbmail' so we can use it to translate the slide where we want it, unlike the handleButtons function where we created a local currentSlide binding and increment/decrement it based on what button was clicked to remind javascript what slide we are currently on//

                    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
                })

                overlaySlides.forEach((slide, index) => {

                    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
                })

                thumbnails.forEach(thumbnail => thumbnail.classList.remove('active-thumbnail'));
                thumbnail.classList.add('active-thumbnail');
            })
        });
    })();


    const translateSlides = ( _ =>{
        const positionSlides = (slides) =>{
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * index}%)`;
            })
        };
        
        positionSlides(mainSlides);
        positionSlides(overlaySlides);

        const handleButtons = slides =>{
            let currentSlide = 0;
            let maxLength = slides.length - 1;
        
            nextBtn.forEach(btn => 
                btn.addEventListener('click', () =>{
                if(currentSlide === maxLength){
                    currentSlide = 0;
                }else {
                    currentSlide++;
                }
        
                slides.forEach((slide, index) => {
                    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`
                })
            }));
    
            prevBtn.forEach(btn => 
                btn.addEventListener('click', () =>{
                if(currentSlide === 0){
                    currentSlide = maxLength
                }else {
                    currentSlide--;
                }
        
                slides.forEach((slide, index) => {
                    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`
                })
            }));
        }
        
            handleButtons(mainSlides);
            handleButtons(overlaySlides);
    })();
    
    
    const handleCount = ( _ =>{
        let counter = 0;
    
        addBtn.addEventListener('click', ()=>{
            counter++
            counterEl.textContent = counter
        });
    
        subtractBtn.addEventListener('click', ()=>{
            counter--
            if(counter < 0){
                counter = 0
            }
            counterEl.textContent = counter
        })

        const getcount = _ => counter;

        return{
            getcount
        }
    })()

})();

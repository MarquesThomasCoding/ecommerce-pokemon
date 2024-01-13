let shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const addToCart = (pokemon) => {
    showConfirmation(pokemon);
    if(shoppingCart.includes(pokemon)) {
        return;
    }
    shoppingCart.push(pokemon);
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

const showConfirmation = (pokemon) => {
    const popUpValidation = document.querySelector('.pop-up-validation');
    popUpValidation.classList.remove('hidden');
    if(shoppingCart.includes(pokemon)) {
        popUpValidation.textContent = 'Already in cart !';
    }
    else {
        popUpValidation.textContent = 'Added to cart !';
    }
    setTimeout(() => {
        popUpValidation.classList.add('hidden');
    }, 2000);
}
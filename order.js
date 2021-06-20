if (document.redayState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  function ready() {
    var removeMenuItemButtons = document.getElementsByClassName('btn-remove-item')
    for (var i = 0; i < removeMenuItemButtons.length; i++) {
      var button = removeMenuItemButtons[i]
      button.addEventListener('click', removeMenuItem)
    }

    var addInputButtons = document.getElementsByClassName('fa-plus-circle')
      for (var i = 0; i < addInputButtons.length; i++) {
        var button = addInputButtons[i]
        button.addEventListener('click', addQuantity)  
      }
  
    var quantityInputs = document.getElementsByClassName('item-quantity-input')
      for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
   
  
    var addToCartButtons = document.getElementsByClassName('order-btn')
      for (var i = 0; i < addToCartButtons.length; i++) {
          var button = addToCartButtons[i]
          button.addEventListener('click', addToCartClicked)
      }
  
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
  }
  
  function purchaseClicked() {
      alert('Thank you! Your order will be done shortly!')
      var cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild)
      }
      updateMenuTotal()
  }
  
  
  function removeMenuItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateMenuTotal()
  }

  function addQuantity(event) {
    var button = event.target
    var cartColumn = button.parentElement
   
    var input = cartColumn.getElementsByClassName('input-item')[1]
    input.value = parseInt(input.value) + 1 
    /*
    if (isNaN(inputVal) || inputVal <= 0 || inputVal == 0) {
      removeMenuItem()
    }
    */

    if (input.value >= 10) {
      input.style.width = "65px";
    } 
    
    updateMenuTotal()
  }
  

  
  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    } 
    updateMenuTotal()
  }



  function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('meal-name')[0].innerText
    var price = shopItem.getElementsByClassName('menu-item-price')[0].innerText
    addItemToCart(title, price)
    updateMenuTotal()
  }
  
  function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
      for (var i = 0; i < cartItemNames.length; i++) {
          if (cartItemNames[i].innerText == title) {
              alert('This item is already added to the cart')
              return
          }
  }
  
    var cartRowContents = `
      <div class="cart-item cart-column">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-item-price cart-column">${price}</span>
      <div class="cart-quantity cart-item-quantity cart-column">
        <i class="fas fa-minus-circle sub-btn fa-1x" aria-hidden="true"></i>
        <input class="item-quantity-input input-item" type="number" value="1">
        <i class="fas fa-plus-circle add-btn fa-1x" aria-hidden="true"></i>
        <button class="btn btn-remove-item" type="button">REMOVE</button>
      </div>`
  
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove-item')[0].addEventListener('click', removeMenuItem)
    cartRow.getElementsByClassName('item-quantity-input')[0].addEventListener('change', quantityChanged)
  
  }
    
  function updateMenuTotal() {
    var CartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = CartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
      var cartQuantity = cartRow.getElementsByClassName('item-quantity-input')[0]
      var price = parseFloat(cartPrice.innerText.replace('$', ''))
      var quantity = cartQuantity.value
      total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('item-total')[0].innerText = '$' + total
  }
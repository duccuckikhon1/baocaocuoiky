  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('.product-name').innerText;
      const productPrice = parseInt(productCard.querySelector('.current-price').innerText.replace(/\D/g, ''));
      const productImage = productCard.querySelector('img').src;

      const existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: Date.now(), // Tạo id dựa trên thời gian hiện tại (unique)
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm vào giỏ hàng!');
      cartLoadPage(); 
    });
  });

  function cartLoadPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartHTML = '';
    let totalMoney = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalMoney += itemTotal;
      totalQuantity += item.quantity;

      cartHTML += `
      <td>${item.name}</td>
      <td><img src="${item.image}" alt="${item.name}" width="50"></td>
      <td>${formatCurrency(item.price)}</td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </td>
      <td>${formatCurrency(itemTotal)}</td>
      <td><button class="btn-delete" onclick="deleteItem(${item.id})">Xoá</button></td>
        </tr>
      `;
    });

    document.getElementById('products-cart').innerHTML = cartHTML;
    document.getElementById('total-money').textContent = formatCurrency(totalMoney);
    document.getElementById('cart-count').textContent = `Giỏ hàng (${totalQuantity})`;
    cartLoadPage();


  }

  function deleteItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage()
  }

  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + '₫';
  }

  document.addEventListener('DOMContentLoaded', cartLoadPage);

  const itemliderbar=document.querySelectorAll('.hanghoa-left-li')
  itemliderbar.forEach(function(menu,index){
    menu.addEventListener("click",function(){
      menu.classList.toggle("block");
    })
  })

  function changeQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === id);
  
    if (product) {
      product.quantity += delta;
      if (product.quantity <= 0) {
        // Nếu số lượng <= 0 thì xoá luôn
        cart = cart.filter(item => item.id !== id);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      cartLoadPage();
    }
  }
  
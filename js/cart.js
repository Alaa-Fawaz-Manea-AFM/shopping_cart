const _not_item_by_cart = document.getElementById("_not_item_by_cart");

_count_items.innerText = cart.length;
cart_main.innerHTML = JSON.parse(localStorage.getItem("cart"))
  .map((pro, j) => {
    return `
      <div class="_shadow flex flex-col justify-around gap-5 max-w-[300px] w-full">
        <div class='w-full h-56 rounded-md overflow-hidden'>
        <img src="${pro.image}" alt="Product ${j}" class='object-cover  w-full h-full rounded-md hover:opacity-70 scale-90 hover:scale-100 transition-all' />
        </div>
        <div class='space-y-5 p-3'>
          <div>
          <h3 class='line-clamp-1 font-bold text-xl'>${pro.title}</h3>
          <p class="line-clamp-3 text-[#747272]">${pro.details}</p>
          <b>Price: $${pro.price}</b>
        </div>

            <div>
                <button onclick="decrement(this, '${pro.id}')">-</button>
                <div class="counter" style="display: inline-block;   padding: 0 10px;">
                ${pro.count}
              </div>
              <button onclick="increment(this,  '${pro.id}')">+</button>
            </div>

      <button onclick="removeFromCart('${pro.id}')" class='bg-green-500 px-3 py-2 rounded-md hover:opacity-75'>Remove From Cart</button>
    </div>
  </div>
    `;
  })
  .join("");

window.onload = totalPriceFun();

check_user();

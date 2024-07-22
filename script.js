const _count_cart = document.getElementById("count_cart");
const _count_items = document.getElementById("_count_items");
const total_price = document.getElementById("total_price");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let loged = !!localStorage.getItem("user");

// total price cart
function totalPriceFun() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (total_price) {
    total_price.textContent = cart
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(2);
  }

  if (cart.length == 0) {
    _not_item_by_cart.style.display = "block";
    total_price.parentElement.style.display = "none";
  }
  return;
}

window.onload = _count_cart && (_count_cart.innerText = cart.length);

// check login user
function check_user() {
  if (
    window.location.pathname !== "/login.html" &&
    !localStorage?.getItem("user")
  ) {
    window.location.href = "login.html";
  }
}
// add to cart
function addToCart(id, title, details, price, image) {
  let check = cart.some((i) => i.id === id);
  let find_item = cart.find((i) => i.id === id);
  if (check) {
    find_item.count < 10 ? find_item.count++ : null;
  } else {
    cart.push({ id, title, details, price, image, count: 1 });
    _count_cart.innerText = cart.length;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return;
}

// remove from cart
const cart_main = document.getElementById("cart_main");
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));

  cart_main.innerHTML = cart
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
  _count_cart.innerText = cart.length;
  _count_items.innerText = cart.length;
  totalPriceFun();
  return;
}

// increment count product
function increment(button, id) {
  const counterDiv = button.previousElementSibling;
  let currentValue = parseInt(counterDiv.textContent);

  if (currentValue < 10) {
    counterDiv.textContent = currentValue + 1;
    updateLocalStorage(id, currentValue + 1);
    totalPriceFun();
  }
  return;
}

// decrement count product
function decrement(button, id) {
  const counterDiv = button.nextElementSibling;
  let currentValue = parseInt(counterDiv.textContent);

  if (currentValue > 1) {
    counterDiv.textContent = currentValue - 1;
    updateLocalStorage(id, currentValue - 1);
    totalPriceFun();
  }
  return;
}

// update increment and decrement count product
function updateLocalStorage(id, newCount) {
  let item = cart.find((i) => i.id === id);

  if (item) {
    item.count = newCount;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  totalPriceFun();
}

// home page

const products = [
  {
    id: 1,
    title:
      "Xiaomi Redmi Buds 4 Lite Black Earphones, 12mm Dynamic Driver with HD Sound Quality, IPX4 Waterproof, Advanced Bluetooth 5.2, 18.5 Hours Long Battery Playtime, Quick Pair with Google, Glacier Gray, In-Ear",
    details:
      "[UPGRADED BLUETOOTH TECHNOLOGY]: With the newly upgraded Bluetooth 5.3 technology, the anti-interference ability is greatly improved, resulting in reduced latency and improved stability when connecting the headphones to a Bluetooth device. Music and calls are all inundated and uninterrupted.",
    price: 30,
    category: "headPhone",
    image: "./images/head/head_01.webp",
  },

  {
    id: 2,
    title:
      "Awei Bluetooth 5.0 Gaming Earphones with Mic, IPX5 Waterproof for Smartphones with 3.5mm AUX Jack, Black a780BL, Over-Ear",
    details:
      "Noise canceling feature: No Equipped with. External Product Identifier Type: European Goods and Products Number EAN-13 Connectivity: wireless/wired",
    price: 38,
    category: "headPhone",
    image: "./images/head/head_02.webp",
  },
  {
    id: 3,
    title:
      "Dell G15 5511 Gaming Laptop Intel Core 11th Generation i5 11260H Hexa Core RAM 16GB SSD 512GB Nvidia GeForce RTX3050 4GB GDDR6 15.6 Inch 120Hz Backlit Keyboard Ubuntu Gray Ubuntu",
    details:
      "Dell G15-5511 Gaming Laptop, Intel Core 11-Generation Core i5 11260H Hexa-Core, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX3050 4GB GDDR6 15.6 Inch, 120Hz, Backlit Keyboard, Ubuntu, Gray",
    price: 1050,
    category: "lapTop",
    image: "./images/lap/lap_01.webp",
  },
  {
    id: 4,
    title:
      "Dell Vostro 3510 Laptop - Intel Core i7-1165G7 11th Gen, 16GB RAM, 1TB HDD + 256GB SSD, NVIDIA GeForce MX350 - GDDR5 15.6-inch (1920 x 1080), Ubuntu - Carbon Black",
    details:
      "Dell Vostro 3510 Laptop - Intel Core i7-1165G7 11th Gen, 16GB RAM, 1TB HDD + 256GB SSD, NVIDIA GeForce MX350 GDDR5 Graphics, 15.6-inch (1920 x 1080) Anti-Glare Display, Ubuntu- Carbon black",
    price: 975,
    category: "lapTop",
    image: "./images/lap/lap_02.webp",
  },
  {
    id: 5,
    title:
      "ASUS VivoBook Go 14 CPU: 4GB RAM Siliron® N4020, Display: 35.56cm HD 16:9 60Hz 128GB eMMC HD, Windows 11, English Keyboard (E1400MA-BV1182W)",
    details:
      "Asus VivoBook Go 14 E1400MA-BV1182W Celeron N4020 Laptop, 4G, DDR4, 128GB, eMMC, Intel UHD Graphics 600, 14.0 inch, HD, Windows 11",
    price: 240,
    category: "lapTop",
    image: "./images/lap/lap_03.webp",
  },
  {
    id: 6,
    title:
      "Lenovo V15 Laptop Intel Core 10110u i3 8GB RAM HDD 1TB Intel UHD 15 Display 15.6-inch HD (1366 x 768) 220nits Anti-Glare DOS Iron Gray DOS",
    details:
      "Lenovo V15 Laptop - Intel Core i3-10110U, 8GB RAM, 1TB HDD, Integrated Intel UHD Graphics, 15.6 Inch HD (1366x768) TN 220 ppi Anti-Glare, DOS - Iron Gray",
    price: 500,
    category: "lapTop",
    image: "./images/lap/lap_04.webp",
  },
  {
    id: 7,
    title:
      "Realme C53 dual-SIM mobile phone with 128 GB ROM and 6 GB RAM, 4G network, Champion Gold - Middle East version, Realme C53",
    details:
      "Equipped with a 6.75-inch IPS LCD display with 90Hz refresh rate and 560 ppi brightness for an immersive visual experience. It runs on Android 13 and Realme UI T, and runs on the efficient Unisoc Tiger T612 chip with an octa-core processor. It offers ample storage space with 128GB internal memory and 6GB RAM, providing multitasking and smooth application performance.",
    price: 165,
    category: "phone",
    image: "./images/phone/phone_01.webp",
  },
  {
    id: 8,
    title:
      "Realme C53 dual SIM mobile phone, 256GB ROM and 8GB RAM, 4G, solid black color - Middle East version, AH5523, Realme C53",
    details:
      "Equipped with a 6.75-inch IPS LCD display with 90Hz refresh rate and 560 ppi brightness for an immersive visual experience. It runs on Android 13 and Realme UI T, and runs on the efficient Unisoc Tiger T612 chip with an octa-core processor. Dual rear camera setup with a 50MP ultra-wide lens and a 0.3MP depth sensor to capture clear and detailed photos. The main camera features an LED flash, HDR, and a panorama mode for versatile photography in different lighting conditions.",
    price: 170,
    category: "phone",
    image: "./images/phone/phone_02.webp",
  },
  {
    id: 9,
    title:
      "Oppo A76 Dual SIM Mobile Phone, 6GB RAM, 128GB ROM (6.56GB) (4G) - (Light Blue) (International Version)",
    details:
      "Battery type: 5000mAh lithium polymer battery, non-removable Display type: IPS panel navigation LCD, 90 Hz, 480 nits (typical), 600 nits (HBM) Operating system: Android 11, Color OS 11.1 USB Port: USB Type C 2.0 cable, with OTG features to read data Package Contents: USB cable + charger",
    price: 225,
    category: "phone",
    image: "./images/phone/phone_03.webp",
  },
  {
    id: 10,
    title:
      "Redmi 13C dual SIM mobile phone with 6GB RAM and 128GB ROM (6.74 inches) (4G network) - (Navy Blue)",
    details:
      "6.74-inch 90Hz display screen 50 MP triple camera with AI technology Huge 5000mAh battery with 18W fast charging Powerful octa-core processor RAM up to 16 GB with expandable memory of 8 GB",
    price: 170,
    category: "phone",
    image: "./images/phone/phone_04.webp",
  },
];
const btn_category = document.querySelectorAll("#btn_category");
const product_main = document.getElementById("product_main");
let _category = "";

// show All to home page And cart page
const maping = (_products) =>
  _products
    .filter((i) =>
      i?.category?.toLowerCase()?.includes(_category?.toLowerCase())
    )
    ?.map((pro, j) => {
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
      <button onclick="addToCart('${pro.id}','${pro.title}','${pro.details}','${pro.price}','${pro.image}')" class='bg-green-500 px-3 py-2 rounded-md hover:opacity-75'>"Add to Cart"</button>
    </div>
  </div>
    `;
    })
    .join("");

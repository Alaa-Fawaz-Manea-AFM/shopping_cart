const year = document.getElementById("year");
product_main.innerHTML = maping(products);

// filter product by category
btn_category.forEach((i) => {
  i.addEventListener("click", () => {
    _category =
      i.textContent.trim() == "All"
        ? (_category = "")
        : i.textContent.trim().replace(" ", "");

    product_main.innerHTML = maping(products);
  });
  return;
});

year.innerText = new Date().getFullYear();

check_user();

import productsData from "../assets/data/product-price-date.js";

const productList = document.getElementById("product-list");
const searchField = document.getElementById("search-field");

searchField.addEventListener("keyup", searchResults);

function searchResults() {
  let filteredProducts = productsData.filter((product) => {
    let regex = new RegExp(searchField.value, "i");
    return regex.test(product.name) || regex.test(product.type);
  });

  let mappedProducts = filteredProducts.map((product) => {
    return `
        <article class="list-group-item list-group-item-action" aria-current="true" onclick="select(e, ${product.index})">
            <div class="d-flex gap-3 w-100 justify-content-between">
                <h5 class="mb-1 product-name">${product.name}</h5>
                <small class="product-price">$${product.price}</small>
            </div>
            <small class="product-type">${product.type}</small>
        </article>
    `;
  });

  productList.innerHTML = mappedProducts.join("");
}

window.onload = function () {
  searchResults();
};

// topRated.js
import { products } from "/epiphany/js/products.js";

/**
 * Shuffle an array randomly.
 */
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

/**
 * Render a Top Rated Products widget that changes every 24 hrs.
 * @param {string} containerId - The ID of the <ul> where products should be rendered.
 * @param {number} limit - Number of products to display (default 5).
 */
export function renderTopRated(containerId = "top-rated-list", limit = 5) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with id "${containerId}" not found.`);
    return;
  }

  // Check if we already have today's selection in localStorage
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let saved = JSON.parse(localStorage.getItem("topRatedProducts"));

  if (!saved || saved.date !== today) {
    // No saved set for today → pick new random ones
    const shuffled = shuffle([...products]);
    saved = {
      date: today,
      items: shuffled.slice(0, limit).map(p => p.id) // store only IDs
    };
    localStorage.setItem("topRatedProducts", JSON.stringify(saved));
  }

  // Find the actual product objects by ID
  const topProducts = saved.items
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  // Render the products
  container.innerHTML = "";
  topProducts.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${product.type}">
        <img width="300" height="300"
             src="${product.image.src}"
             alt="${product.name}" />
        <span class="product-title">${product.name}</span>
      </a>
      <span class="woocommerce-Price-amount amount">
        <span class="woocommerce-Price-currencySymbol">&#36;</span>0.00
      </span>
    `;
    container.appendChild(li);
  });
}

import { products } from "../products.js";

// Utility: shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Get daily random 9 products
function getDailyProducts() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem("dailyGalleryProducts");

  if (saved) {
    const { date, items } = JSON.parse(saved);
    if (date === today) return items;
  }

  const shuffled = shuffleArray([...products]);
  const selected = shuffled.slice(0, 9);

  localStorage.setItem("dailyGalleryProducts", JSON.stringify({ date: today, items: selected }));
  return selected;
}

// Render gallery component
export function renderGallery(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const dailyProducts = getDailyProducts();

  container.innerHTML = `
    <div id="gallery-1" class="gallery galleryid-122 gallery-columns-3 gallery-size-thumbnail">${dailyProducts.map(product => 
`<figure class='gallery-item'>
          <div class='gallery-icon landscape'>
            <a href="${product.type}">
              <img 
                width="150" 
                height="150"
                src="${product.image.dataThumb}" 
                srcset="${product.image.srcset}"
                alt="${product.name}"
                class="attachment-thumbnail size-thumbnail"
                sizes="(max-width: 100px) 100vw, 150px"
              />
            </a>
          </div>
        </figure>`).join('')}
    </div>
  `;
}

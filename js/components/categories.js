// categories.js

// Define categories (no "Tea")
const categories = [
  { id: 1, name: "Skin Care Supplements" },
  { id: 2, name: "Herbal Supplements" },
  { id: 3, name: "Anti-Aging" },
  { id: 4, name: "Health And Wellness" },
  { id: 5, name: "Supplements" } // replacement for the Tea one
];

/**
 * Renders the category component into a given container.
 * @param {string} containerId - The ID of the <ul> container element.
 */
export function renderCategories(containerId = "category-list") {
  const categoryList = document.getElementById(containerId);

  if (!categoryList) {
    console.warn(`Container with id "${containerId}" not found.`);
    return;
  }

  categoryList.innerHTML = ""; // Clear old content

  categories.forEach(cat => {
    const li = document.createElement("li");
    li.className = `cat-item cat-item-${cat.id}`;
    li.innerHTML = `
      <a href="category.html?category=${encodeURIComponent(cat.name)}">${cat.name}</a>
    `;
    categoryList.appendChild(li);
  });
}

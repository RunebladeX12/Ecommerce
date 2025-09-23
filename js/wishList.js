import { addToCart, logCartItems, loadCartFromStorage } from './cart.js';


export let wishlistItems = [];

export function addToWishlist(product) {
  loadWishlistFromStorage();
  
  // Ensure wishlistItems is an array
  if (!Array.isArray(wishlistItems)) {
    console.log("wishlistItems was not an array. Initializing it as an empty array.");
    wishlistItems = [];
  }

  let existingItem = wishlistItems.find(item => item.id === product.id);
  if (existingItem) {
    console.log(`Item with ID ${product.id} is already in wishlist.`);
    // Trigger animation for feedback without adding duplicate
    let button = document.querySelector(`.add_to_wishlist[data-product-id="${product.id}"]`);
    if (button) {
      button.querySelector('i').classList.add('wishlist-added');
      setTimeout(() => button.querySelector('i').classList.remove('wishlist-added'), 300);
    }
    return;
  }

  wishlistItems.push(product);
  console.log(`Item with ID ${product.id} added to wishlist.`);

  // Trigger animation and update icon
  let wishlistButton = document.querySelector(`.add_to_wishlist[data-product-id="${product.id}"]`);
  if (wishlistButton) {
    let icon = wishlistButton.querySelector('i');
    icon.classList.add('fas', 'wishlist-added');
    icon.classList.remove('far');
    setTimeout(() => icon.classList.remove('wishlist-added'), 300);
  }

  saveWishlistToStorage();
}

export function initWishlist() {
  console.log('Wishlist script initialized.');
  loadWishlistFromStorage();
  
  // Check and update icons on page load based on stored items
  wishlistItems.forEach(item => {
    let button = document.querySelector(`.add_to_wishlist[data-product-id="${item.id}"]`);
    if (button) {
      let icon = button.querySelector('i');
      icon.classList.add('fas');
      icon.classList.remove('far');
    }
  });
}

export function loadWishlistFromStorage() {
  let storedWishlist = localStorage.getItem('wishlistItems');
  wishlistItems = storedWishlist ? JSON.parse(storedWishlist) : [];
}

export function saveWishlistToStorage() {
  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
}

export function logWishlistItems() {
  console.log('Current wishlist items:', wishlistItems);
}

export function removeFromWishlist(itemId) {
  console.log('Attempting to remove item with ID:', itemId);
  loadWishlistFromStorage();
  const initialLength = wishlistItems.length;
  wishlistItems = wishlistItems.filter(item => item.id !== itemId);
  if (wishlistItems.length < initialLength) {
    console.log(`Item with ID ${itemId} removed from wishlist.`);
    saveWishlistToStorage();
  } else {
    console.log(`No item with ID ${itemId} found to remove.`);
  }
  const event = new Event('wishlistUpdated');
  window.dispatchEvent(event);
}

export function wishListAddToCart(itemId) {
  console.log('Attempting to add item with ID to cart:', itemId);
  loadWishlistFromStorage();
  const item = wishlistItems.find(item => item.id === itemId);
  if (item) {
    console.log('Item found, adding to cart:', item);
    // Placeholder for actual cart logic
    const productToAdd = { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image };
    addToCart(productToAdd);

    // Store notification data in sessionStorage
    sessionStorage.setItem('cartNotification', JSON.stringify({
      name: item.name,
      timestamp: new Date().toISOString()
    }));

    // Remove item from wishlist
    wishlistItems = wishlistItems.filter(i => i.id !== itemId);
    saveWishlistToStorage();
    console.log('Item removed from wishlist after adding to cart:', wishlistItems);
    location.reload();
  } else {
    console.log(`No item with ID ${itemId} found to add to cart.`);
  }
}
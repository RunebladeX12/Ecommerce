// header.js

/**
 * Renders the top bar + header (navbar).
 * @param {string} containerId - The ID of the element where header will be injected.
 */
export function renderHeader(containerId = "header-container") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found.`);
    return;
  }

  container.innerHTML = `
 <div id="top-bar" class="top-header">
        <div class="container">
            <div class="top-left">

                            <div class="top-left-inner">
                                <span class="address"><i class="fa fa-map-marker" aria-hidden="true"></i> New York, US</span>
            
                                <span class="phone"><i class="fa fa-phone" aria-hidden="true"></i> +1-123-456-7890</span>
            
                                <span class="fax"><i class="far fa-envelope" aria-hidden="true"></i> <a href="#" class="__cf_email__" >rema6rema6@gmail.com</a></span>
                            
        </div>
            </div>
            
            <div class="top-right">
                
                    <div class="top-social-menu menu-social-menu-container"> 

                        <div class="widget ecommerce_gem_widget_social"><div class="menu-social-menu-container"><ul id="menu-social-menu" class="menu"><li id="menu-item-5" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-5"><a target="_blank" href="https://www.facebook.com/TheProDesigns"><span class="screen-reader-text">Facebook</span></a></li>
<li id="menu-item-6" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-6"><a target="_blank" href="https://twitter.com/TheProDesigns"><span class="screen-reader-text">Twitter</span></a></li>
<li id="menu-item-132" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-132"><a target="_blank" href="https://www.youtube.com/"><span class="screen-reader-text">Youtube</span></a></li>
<li id="menu-item-280" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-280"><a href="https://instagram.com/TheProDesigns"><span class="screen-reader-text">instagram</span></a></li>
</ul></div></div>
                    </div>
                    
                        <div class="top-account-wrapper logged-out">
                            <a href="#">
                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                <span class="top-log-in">Login / Register</span>
                            </a>
                        </div>

                                                <div class="top-wishlist-wrapper">
                        <div class="top-icon-wrap">
                                                        
                                <a class="wishlist-btn" href="/pages/my-accounts/wishlist.html"><i class="fa fa-heart" aria-hidden="true"></i></a>
                              
                                                        </div>
                    </div>
                                            <div class="top-cart-wrapper">
                        <div class="top-icon-wrap">
                            <a href="/pages/my-accounts/cart.html">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                              
                            </a>
                        </div>
                        <div class="top-cart-content">
                            <div class="widget woocommerce widget_shopping_cart"><div class="widget_shopping_cart_content"></div></div>                            </div>
                    </div>
                    
                    <div class="search-holder">

                        <a href="#" class="search-btn"><i class="fa fa-search"></i></a>

                        <div class="search-box" style="display: none;">

                            
                                <div class="product-search-wrapper">
                                    
                                    <form role="search" method="get" action="#">
                                        <input type="hidden" name="post_type" value="product" />

                                        <input type="text" class="search-field products-search" placeholder="Search Products ..." value="" name="s" />

                                        <select class="product-cat" name="product_cat">

                                            <option value="">Select Category</option> 

                                            <option value="accessories">Accessories (4)</option><option value="casual">Casual (6)</option><option value="clothing">Clothing (12)</option><option value="men">Men (4)</option><option value="women">Women (7)</option>
                                        </select>
                                        
                                        <button type="submit" class="search-submit"><span class="screen-reader-text">Search</span><i class="fa fa-search" aria-hidden="true"></i></button>
                                    </form>

                                        
                                </div> <!-- .product-search-wrapper -->
                            
                        </div>
                    </div><!-- .search-holder -->
                                    </div>
            
        </div>
    </div>
    <!-- Header / Navbar -->
    <div class="sticky-wrapper" id="sticky-wrapper">
      <header id="masthead" class="site-header main-navigation-holder" role="banner">
        <div class="container">
          <div class="head-wrap">
            <div class="site-branding">
              <h2 class="site-title">
                <a href="/" rel="home">eCommerce Gem</a>
              </h2>
              <h3 class="site-description">Multipurpose e-Commerce WP Theme</h3>
            </div>

            <div id="main-nav" class="clear-fix">
              <nav id="site-navigation" class="main-navigation" role="navigation">
                <div class="wrap-menu-content">
                  <div class="menu-main-menu-container">
                    <ul id="primary-menu" class="menu">
                      <li><a href="/">Home</a></li>
                      <li class="menu-item-has-children">
                        <a href="/pages/shop.html">Shop</a>
                        <ul class="sub-menu">
                          <li><a href="/pages/category.html?category=Skin%20Care%20Supplements">Skin Care </a></li>
                          <li><a href="/pages/category.html?category=Herbal%20Supplements">Herbal </a></li>
                          <li><a href="/pages/category.html?category=Anti-Aging">Anti-Aging</a></li>
                          <li><a href="/pages/category.html?category=Health%20And%20Wellness">Health</a></li>
                          <li><a href="/pages/category.html?category=Supplements">Supplements</a></li>
                        </ul>
                      </li>
                      <li class="menu-item-has-children">
                        <a href="/pages/my-account.html">My account</a>
                        <ul class="sub-menu">
                          <li><a href="/pages/my-accounts/cart.html">Cart</a></li>
                          <li><a href="/pages/my-accounts/checkout.html">Checkout</a></li>
                          <li><a href="/pages/my-accounts/wishlist.html">Wishlist</a></li>
                        </ul>
                      </li>
                      <li><a href="/pages/blog.html">Blog</a></li>
                      <li><a href="/pages/contact.html">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  `;
}

// footer.js

/**
 * Renders the footer widget + footer section.
 * @param {string} containerId - The ID of the element where footer will be injected.
 */
export function renderFooter(containerId = "footer-container") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found.`);
    return;
  }

  container.innerHTML = `
<aside id="footer-widgets" class="widget-area" role="complementary">
  <div class="container">
    <div class="inner-wrapper">
      
      <!-- About -->
      <div class="widget-column footer-active-3">
        <section id="text-2" class="widget widget_text">
          <h4 class="widget-title">About eCommerce Gem</h4>
          <div class="textwidget">
            <p>Nunc et ornare tellus. Quisque imperdiet interdum commodo. Integer laoreet tristique neque quis laoreet. Duis ut ultrices est, sed feugiat leo.</p>
          </div>
        </section>

        <!-- Social -->
        <section id="ecommerce-gem-social-2" class="widget ecommerce_gem_widget_social">
          <div class="menu-social-menu-container">
            <ul id="menu-social-menu-1" class="menu">
              <li class="menu-item"><a target="_blank" href="https://www.facebook.com/TheProDesigns"><span class="screen-reader-text">Facebook</span></a></li>
              <li class="menu-item"><a target="_blank" href="https://twitter.com/TheProDesigns"><span class="screen-reader-text">Twitter</span></a></li>
              <li class="menu-item"><a target="_blank" href="https://www.youtube.com/"><span class="screen-reader-text">Youtube</span></a></li>
              <li class="menu-item"><a target="_blank" href="https://instagram.com/TheProDesigns"><span class="screen-reader-text">Instagram</span></a></li>
            </ul>
          </div>
        </section>
      </div>

      <!-- Contact -->
      <div class="widget-column footer-active-3">
        <section id="ecommerce-gem-contact-2" class="widget ecommerce_gem_widget_contact">
          <div class="contact-list">
            <h4 class="widget-title">Contact Us</h4>
            <div class="contact-wrapper">
              <div class="contact-item">
                <div class="contact-inner">
                  <span class="contact-icon"><span class="icon-map"></span></span>
                  <div class="contact-text-wrap"><p>New York, US</p></div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-inner">
                  <span class="contact-icon"><span class="icon-envelope"></span></span>
                  <div class="contact-text-wrap"><p><a href="mailto:[email protected]">[email protected]</a></p></div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-inner">
                  <span class="contact-icon"><span class="icon-mobile"></span></span>
                  <div class="contact-text-wrap"><p>+1-123-456-7890</p></div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-inner">
                  <span class="contact-icon"><span class="icon-global"></span></span>
                  <div class="contact-text-wrap"><p>prodesigns.com</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Features -->
      <div class="widget-column footer-active-3">
        <section id="ecommerce-gem-features-2" class="widget ecommerce_gem_widget_features">
          <div class="features-list">
            <div class="features-wrapper">
              <div class="feature-item">
                <div class="feature-inner">
                  <span class="feature-icon"><span class="icon-refresh"></span></span>
                  <div class="feature-text-wrap">
                    <h4 class="feature-title">Free Shipping &amp; Return</h4>
                    <p>Free shipping on all orders above $99</p>
                  </div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-inner">
                  <span class="feature-icon"><span class="icon-wallet"></span></span>
                  <div class="feature-text-wrap">
                    <h4 class="feature-title">Money Back Guarantee</h4>
                    <p>100% money back guarantee</p>
                  </div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-inner">
                  <span class="feature-icon"><span class="icon-chat"></span></span>
                  <div class="feature-text-wrap">
                    <h4 class="feature-title">24/7 Online Support</h4>
                    <p>Support staffs ready to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</aside>

<footer id="colophon" class="site-footer" role="contentinfo">
  <div class="container">
    <div class="site-footer-wrap">
      <div class="copyright">
        Copyright &copy; All rights reserved.
      </div>
      <div class="site-info">
        eCommerce Gem by <a href="https://www.prodesigns.com/" rel="designer">ProDesigns</a>
      </div>
    </div>
  </div>
</footer>
  `;
}

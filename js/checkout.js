/* =========================================================
 *  CHECKOUT PAGE – REFACTORED (with custom modal)
 * ========================================================*/
(() => {
  'use strict';

  /* ----------  CONFIG  ---------- */
  const SELLER_TEL = '+2348146927170';
  const COUNTRIES  = { NG: 'Nigeria', US: 'United States', UK: 'United Kingdom' };
  const NG_STATES  = ['Lagos', 'Kano', 'Abuja'];

  const FIELDS = [
    { id: 'billing_first_name', label: 'First name', required: true, class: 'form-row-first' },
    { id: 'billing_last_name',  label: 'Last name',  required: true, class: 'form-row-last' },
    { id: 'billing_company',    label: 'Company name', required: false, class: 'form-row-wide' },
    { id: 'billing_country',    label: 'Country', type: 'select', required: true, class: 'form-row-wide', options: COUNTRIES, default: 'NG' },
    { id: 'billing_address_1',  label: 'Street address', placeholder: 'House number and street name', required: true, class: 'form-row-wide' },
    { id: 'billing_address_2',  label: 'Apartment, suite, unit etc.', required: false, class: 'form-row-wide' },
    { id: 'billing_city',       label: 'Town / City', required: true, class: 'form-row-wide' },
    { id: 'billing_state',      label: 'State / County', type: 'select', required: true, class: 'form-row-wide', options: NG_STATES },
    { id: 'billing_postcode',   label: 'Postcode / ZIP', required: true, class: 'form-row-wide' },
    { id: 'billing_phone',      label: 'Phone', required: true, class: 'form-row-wide' },
    { id: 'billing_email',      label: 'Email', required: true, class: 'form-row-wide' }
  ];

  /* ----------  STATE  ---------- */
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  /* ----------  CACHE DOM  ---------- */
  const els = {
    wrapper:  document.getElementById('billingFieldsWrapper'),
    items:    document.getElementById('orderItemsBody'),
    subtotal: document.getElementById('subtotalAmount'),
    total:    document.getElementById('totalAmount'),
    btn:      document.getElementById('place_order')
  };

  /* =========================================================
   *  1.  INITIALISATION
   * ========================================================*/
  function init() {
    injectModal();          // add HTML for custom confirm
    buildForm();
    renderCart();
    els.btn.addEventListener('click', handlePlaceOrder);
  }

  /* =========================================================
   *  2.  INJECT CUSTOM MODAL INTO BODY
   * ========================================================*/
  function injectModal(){
    const markup = `
      <div id="confirmOverlay" class="confirm-overlay">
        <div class="confirm-box">
          <p>Clear cart after order?</p>
          <button id="confirmYes" class="btn-yes">Yes</button>
          <button id="confirmNo"  class="btn-no">No</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  /* =========================================================
   *  3.  BUILD BILLING FORM
   * ========================================================*/
  function buildForm() {
    FIELDS.forEach(f => els.wrapper.appendChild(createField(f)));
    updateStateOptions(); // country listener
    document.getElementById('billing_country').addEventListener('change', updateStateOptions);
  }

  function createField(f) {
    const p = document.createElement('p');
    p.className = `form-row ${f.class || ''}`;

    const label = document.createElement('label');
    label.htmlFor = f.id;
    label.textContent = `${f.label}${f.required ? ' *' : ''}`;

    const control = f.type === 'select' ? createSelect(f) : createInput(f);
    p.append(label, control);
    return p;
  }

  function createInput(f) {
    const i = document.createElement('input');
    i.id = i.name = f.id; i.type = 'text';
    i.placeholder = f.placeholder || ''; i.required = f.required;
    return i;
  }

  function createSelect(f) {
    const s = document.createElement('select');
    s.id = s.name = f.id; s.required = f.required;
    Object.entries(f.options).forEach(([val, txt]) => {
      const o = new Option(txt, val);
      if (val === f.default) o.selected = true;
      s.appendChild(o);
    });
    return s;
  }

  function updateStateOptions() {
    const country = document.getElementById('billing_country').value;
    const stateEl = document.getElementById('billing_state');
    stateEl.innerHTML = '';
    (country === 'NG' ? NG_STATES : []).forEach(st => stateEl.append(new Option(st, st)));
  }

  /* =========================================================
   *  4.  CART RENDERING
   * ========================================================*/
  function renderCart() {
    els.items.innerHTML = '';
    let sub = 0;
    cartItems.forEach(it => {
      sub += it.price * it.quantity;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="product-name">${it.name}
          <strong class="product-quantity">&times; ${it.quantity}</strong>
        </td>
        <td class="product-total">
          <span class="woocommerce-Price-amount amount">
            <span class="woocommerce-Price-currencySymbol">&#36;</span>${(it.price * it.quantity).toFixed(2)}
          </span>
        </td>`;
      els.items.appendChild(tr);
    });
    els.subtotal.innerHTML = els.total.innerHTML = money(sub);
    els.btn.disabled = !cartItems.length;
  }

  const money = n => `<span class="woocommerce-Price-amount amount">
                        <span class="woocommerce-Price-currencySymbol">&#36;</span>${n.toFixed(2)}
                      </span>`;

  /* =========================================================
   *  5.  VALIDATION + ERROR DISPLAY
   * ========================================================*/
  function validateForm() {
    clearErrors();
    let ok = true;

    FIELDS.forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;

      let failed = false;
      if (f.required && !el.value.trim()) failed = true;
      if (f.id === 'billing_email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) failed = true;
      if (f.id === 'billing_phone' && el.value && !/^\+?[1-9]\d{9,14}$/.test(el.value)) failed = true;

      el.classList.toggle('woocommerce-invalid', failed);
      el.classList.toggle('woocommerce-validated', !failed);
      if (failed) {
        ok = false;
        showFieldError(el, f);
      }
      el.oninput = () => validateForm();
    });

    if (!ok) showTopBanner('Please correct the highlighted fields below.');
    return ok;
  }

  function clearErrors() {
    document.querySelectorAll('.woo-error-msg').forEach(e => e.remove());
    const b = document.getElementById('woo-top-banner');
    if (b) b.remove();
  }

  function showFieldError(el, f) {
    const txt = f.id === 'billing_email' ? 'Valid email required.' :
                f.id === 'billing_phone' ? 'Valid phone number required.' :
                'This field is required.';
    const span = document.createElement('span');
    span.className = 'woo-error-msg';
    span.textContent = txt;
    el.parentElement.appendChild(span);
  }

  function showTopBanner(msg) {
    const b = document.createElement('div');
    b.id = 'woo-top-banner';
    b.className = 'woo-banner-error';
    b.textContent = msg;
    document.querySelector('.woocommerce-checkout').prepend(b);
  }

  /* =========================================================
   *  6.  CUSTOM MODAL PROMISE
   * ========================================================*/
  function askClearCart(){
    const overlay = document.getElementById('confirmOverlay');
    overlay.classList.add('show');

    return new Promise(res=>{
      const yes = ()=>{ overlay.classList.remove('show'); res(true);  };
      const no  = ()=>{ overlay.classList.remove('show'); res(false); };
      document.getElementById('confirmYes').onclick = ()=>{ yes(); };
      document.getElementById('confirmNo').onclick  = ()=>{ no();  };
    });
  }

  /* =========================================================
   *  7.  PLACE ORDER
   * ========================================================*/
  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!validateForm()) {
      const firstBad = document.querySelector('.woocommerce-invalid');
      if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const data = FIELDS.reduce((o, f) => (o[f.id] = document.getElementById(f.id).value, o), {});
    const msg = [`New Order`, ``, `Customer Details:`]
      .concat(Object.entries(data).map(([k, v]) =>
        `${k.replace('billing_','').replace(/_/g,' ')
           .replace(/\b\w/g,l=>l.toUpperCase())}: ${v}`))
      .concat([``, `Cart Items:`])
      .concat(cartItems.map(it => `${it.name} x${it.quantity} - $${(it.price * it.quantity).toFixed(2)}`))
      .concat([``, `Total: ${totalAmount.textContent.match(/\d+\.\d{2}/)[0]}`])
      .join('\n');

    const whatsappURL = `https://wa.me/${SELLER_TEL}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, '_blank');          // keep this page alive

    const userWantsClear = await askClearCart(); // wait for modal tap
    if (userWantsClear){
      localStorage.removeItem('cartItems');
      cartItems = [];
      renderCart();
      location.reload();
    }
  }

  /* =========================================================
   *  8.  BOOTSTRAP
   * ========================================================*/
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
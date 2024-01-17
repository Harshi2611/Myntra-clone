const Convenience_fees = 99;
let bagItemsobj;

onload();

function onload() {
  loadbagItemsobj();
  displaybag();
  displaybagsumm();
}
function displaybagsumm() {
  let bagsummElemnt = document.querySelector('.bag-summary');
  let totalItems = bagItemsobj.length;
  let totalMRP = 0;
  let totalDiscount = 0;


  bagItemsobj.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let finalPayment = totalMRP - totalDiscount + Convenience_fees;

  bagsummElemnt.innerHTML = `
  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount"
      >-Rs${totalDiscount}</span
    >
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr />
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${finalPayment}</span>
  </div>
</div>`;

}


function loadbagItemsobj() {
  console.log(bagItems);
  bagItemsobj = bagItems.map(itmeId => {
    for (let i = 0; i < items.length; i++) {
      if (itmeId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemsobj);
}
function displaybag() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = ' ';
  bagItemsobj.forEach(bagItem => {
    innerHTML += genrateItemhtml(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removefromBag(itemId) {
  bagItems = bagItems.filter(bagitemId => bagitemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadbagItemsobj();
  displaybagitem();
  displaybag();
  displaybagsumm();
}


function genrateItemhtml(item) {
  return `<div class="bag-item-container">
<div class="item-left-part">
  <img class="bag-item-img" src="../${item.image}" />
</div>
<div class="item-right-part">
  <div class="company">${item.company}</div>
  <div class="item-name">
    ${item.item_name}
  </div>
  <div class="price-container">
    <span class="current-price">Rs ${item.current_price}</span>
    <span class="original-price">Rs ${item.original_price}</span>
    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
  </div>
  <div class="return-period">
    <span class="return-period-days">${item.return_period} days</span> return available
  </div>
  <div class="delivery-details">
    Delivery by
    <span class="delivery-details-days">${item.delivery_date}</span>
  </div>
</div>

<div class="remove-from-cart" onclick="removefromBag(${item.id})">X</div>
</div>
</div>`;
}
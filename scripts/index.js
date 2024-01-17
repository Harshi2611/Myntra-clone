let bagItems;
onload();
function onload() {
  let bagItemsstr = localStorage.getItem('bagItems');
  bagItems = bagItemsstr ? JSON.parse(bagItemsstr) : [];
  displayitems();
  displaybagitem();
}

function addtobag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displaybagitem();
}
function displaybagitem() {
  let bagitemcountElement = document.querySelector('.bag-count');
  if (bagItems.length > 0) {
    bagitemcountElement.style.visibility = 'visible';
    bagitemcountElement.innerText = bagItems.length;
  } else {
    bagitemcountElement.style.visibility = 'hidden';
  }

}


function displayitems() {
  let itemscontainerElemnt = document.querySelector('.items-container');
  if (!itemscontainerElemnt) {
    return;
  }
  let innerHTML = '';
  items.forEach(item => {
    innerHTML += `
  <div class="item-container">
  <img class="item-img" src="${item.image}" alt="item img" />
  <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
  <div class="company-name">${item.company}</div>
  <div class="item-name">${item.item_name}</div>
  <div class="price">
    <span class="curr-price">Rs ${item.current_price}</span>
    <span class="org-price">Rs ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
  </div>
  <button class="btn-add" onclick="addtobag(${item.id})">Add to Bag</button>
  </div>`
  })
  itemscontainerElemnt.innerHTML = innerHTML;
}

// init Isotope
// var $grid = $('.collection-list').isotope({
    // options
  // });
  // filter items on button click
  // $('.filter-button-group').on( 'click', 'button', function() {
  //   var filterValue = $(this).attr('data-filter');
  //   resetFilterBtns();
  //   $(this).addClass('active-filter-btn');
  //   $grid.isotope({ filter: filterValue });
  // });

  // var filterBtns = $(".filter-button-group").find('button');
  // function resetFilterBtns() {
  //   filterBtns.each(function() {
  //       $(this).removeClass('active-filter-btn')
  //   });
  // }
  

  // cart js code
  let basket = JSON.parse(localStorage.getItem("data")) || [];

  let generateShop = () => {
    let shopHTML = shopItemsData.map((x) => {
      const { id, name, price, img } = x;
      let search = basket.find((x) => x.id === id) || { item: 0 }; // Default to item 0 if not found
  
      return `
      <div id="product-id-${id}" class="col-lg-3 col-md-4 col-6 gap-4 custom-gap">
        <div class="item special-img">
          <img src="${img}" alt="${name}" class="products-images">
          <div class="details">
            <h2 class="text-center">${name}</h2>
            <div class="price-quantity">
              <div class="custom-flex gap-4">
                <h4 class="text-muted">$${price}</h4>
                <div class="buttons d-flex custom-size gap-4">
                  <span onclick="decrement('${id}')">-</span>
                  <div id="quantity-${id}" class="quantity">${search.item}</div>
                  <span onclick="increment('${id}')">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  
    shop.innerHTML = shopHTML;
  };

  // second section

const generateFreshShop = () => {
  return freshShopItemsData.map((x) => {
    const { id, name, price, img } = x;

    return `
      <div id="product-id-${id}" class="col-lg-3 col-md-4 col-6">
        <div class="item">
          <img src="${img}" alt="${name}" class="products-images">
          <div class="details">
            <h2>${name}</h2>
            <div class="price-quantity">
              <div class="custom-flex gap-4">
                <h2 class="text-muted">$ ${price}</h2>
                <div class="buttons d-flex custom-size gap-4">
                  <span onclick="decrement('${id}')">-</span>
                  <div id="quantity-${id}" class="quantity">0</div>
                  <span onclick="increment('${id}')">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
};

// Generate the Freshshop HTML
Freshshop.innerHTML = generateFreshShop();


  
  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem);
  };
  
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
  
    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0);
  
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
  
    if (search) {
      console.log(search.item);
      let quantityElement = document.getElementById(`quantity-${id}`);
      if (quantityElement) {
        quantityElement.innerHTML = search.item; // Update the innerHTML of the quantity element
      } else {
        console.error(`Quantity element with id 'quantity-${id}' not found.`);
      }
    } else {
      console.error(`Item with id ${id} not found in the basket.`);
    }
  
    calculation();
  };
  
  let calculation = () => {
    let cartIcon = document.getElementById("CartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  
  generateShop();
  calculation();
  

  
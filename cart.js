let label = document.getElementById("label")
let ShoppingCart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || []  

let calculation = () =>{
  let cartIcon = document.getElementById("CartAmount")
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x + y, 0);
  
};
calculation()

let generateCartItems = ()=>{
  if ( basket.length !== 0){
    return (ShoppingCart.innerHTML = basket.map((x)=>{
      let {id, item} = x;
      let search = shopItemsData.find((y)=> y.id === id) || []
      let {img, name, price} = search
      return `
      <div class="cart-item">
          <img width="100" src= ${img} alt="${name}" class="cardImage">
          <div class="details">
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p class="custom-size">${name}</p>
                    <p class="cart-item-price">$${price} </p>
                  </h4>
                  <ion-icon name="close" onclick="removeItem('${id}')" class="cancel pb-4"></ion-icon>
              </div>
              
              <div class="buttons d-flex custom-size gap-4">
                <span onclick="decrement (${id})">-</span>
                <div  id=${id} class="quantity"> ${item}</div>
                <span onclick="increment(${id})">+</span>
            </div>
              <h3 class="custom-resize">$ ${item * search.price}</h3>
          </div>
      </div>`
    }).join(' '));

  }
  else{
    ShoppingCart.innerHTML = ''
    label.innerHTML = '<h2>Cart is empty</h2><a href="index.html"><button className="HomeBtn">Back to Home</button></a>'
  }
}


generateCartItems()


let increment =(id)=> {
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);
  
  // there is a bug here, making code not working
 if (search === 0) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  }
    else {
      search.item += 1
    }
    
    localStorage.setItem("data", JSON.stringify(basket))
  generateCartItems()
  update(selectedItem.id);

  };



let decrement =(id)=> {
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
  };

  let update =(id)=> {
    let search = basket.find((x)=> x.id ===id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation()
    TotalAmount()
  };
  
  let clearCart=()=>{
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
  }
  
  let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  

  let TotalAmount =()=>{
    if(basket.lenght !==0){
      let amount = basket.map((x)=>{
        let {item, id} = x;
      let search = shopItemsData.find((y)=> y.id === id) || []
      return item * search.price
      }).reduce((x, y)=> x+y, 0)

      label.innerHTML = `
      <h2> Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      
      `
    }

    else{
    
    }
  }
  TotalAmount()
 

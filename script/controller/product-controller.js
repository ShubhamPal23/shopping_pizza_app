// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import productOperations from "../services/product-operation.js";

// Data Exchange B/w View and Model.
async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
    }
}
loadPizzas();

/*
 <div class="col-4">
                  <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
*/

function addToCart(){
  // this - keyword (Current calling object reference)
  console.log('Add to Cart Called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  productOperations.update_quantity(pizzaId,'+');
  printBasket();
  amt();
}

function printBasket(){
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector('#basket');
  basket.innerHTML = '';
 for(let product of cartProducts){
      const list = document.createElement('div');
      list.className='row ';
      const img = document.createElement('img');
      img.src = product.url;
      img.className = 'col-6';
      list.appendChild(img);
      list.appendChild(prepareitem(product));
      basket.appendChild(list);
  }
  
}
function amt(){
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector('#amount');
  var total=0.0;
  for(let product of cartProducts){
    total=total+parseFloat(product.price*product.quantity);
  }
  basket.innerHTML = '';
      const li = document.createElement('div');
      li.innerText = `Total is : ${total}`;
      basket.appendChild(li);
      var sum=total*1.18;
      const li1 = document.createElement('div');
      li1.innerText = `Payable amount : ${sum}`;
      basket.appendChild(li1);
}

function reduce(){
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  productOperations.update_quantity(pizzaId,'-');
  printBasket();
  amt();
}

function increase(){
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  productOperations.update_quantity(pizzaId,'+');
  printBasket();
  amt();
}

function prepareitem(pizza){
  const cardDiv=document.createElement('div');
  cardDiv.className='card';
  cardDiv.style = "width: 14rem;";
  const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = `Price : ${pizza.price}`;
    cardBody.appendChild(pTag);
    const qTag = document.createElement('p');
    qTag.className = 'card-text';
    qTag.innerText = `Quantity : ${pizza.quantity}` ;
    cardBody.appendChild(qTag);
    const button1 = document.createElement('button');
    button1.setAttribute('product-id', pizza.id);
    button1.addEventListener('click', increase);// Event Bind
    button1.innerText = '+';
    button1.className = 'btn btn-primary';
    button1.style="background-color:#008000";
    cardBody.appendChild(button1);
    const button2 = document.createElement('button');
    button2.setAttribute('product-id', pizza.id);
    button2.addEventListener('click', reduce);// Event Bind
    button2.innerText = '-';
    button2.className = 'btn btn-primary m-2';
    button2.style="background-color:#FF0000";
    cardBody.appendChild(button2);
    return cardDiv;
    
}

function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4 w3-theme-l4 ';
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    colDiv.appendChild(img);
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem;";
    colDiv.appendChild(cardDiv);
   
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);// Event Bind
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);

}

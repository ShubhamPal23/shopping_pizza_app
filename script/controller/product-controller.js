//it is a bridge b/w view and model
//controller = I/O layer
//update view 
import productOperations from "../services/product-operation.js";
async function loadpizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log("Pizzas are", pizzas);
    for (let pizza of pizzas) {
      preparePizzaCard(pizza);
    }      
}
loadpizzas();

function addToCart(){
  totalprice();
  // this - keyword (Current calling object reference)
  console.log('Add to Cart Called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  const selectedPizza=productOperations.search(pizzaId,"+");
  printBasket();
  
}
function printBasket(){
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector('#basket');
 
  basket.innerHTML = '';
  for(let product of cartProducts){
      const list = document.createElement('div');
      list.className = 'row col-12';
      // const li = document.createElement('li');
      // li.innerText = `${product.name} ${product.price}`;
      const img = document.createElement('img');
      img.src=product.url;
      img.className='col-6';
      list.appendChild(img);
      list.appendChild(preparePizza(product))

      // pizzaContainer.appendChild(li);
      // pizzaContainer.appendChild(img)
    
       
      
      basket.appendChild(list);
  }
}
function totalprice(){
  const cartProducts = productOperations.getProductsInCart();
  const totals= document.querySelector('#totalsum');
  var t=0.0;
  for(let product of cartProducts){
    t=t+parseFloat(product.price*product.quantity);
  }
    totals.innerHTML = '';
    var totalgst = t+(t*.18);
    const li = document.createElement('div');
    const li1 = document.createElement('div');
    const li2 = document.createElement('div');
    
    li.innerText = `Total price :  ₹${t.toFixed(2)}`;
    li2.innerText = `GST  :   ₹${(t*.18).toFixed(2)}     `;
    li2.style="font-family: Courier New, monospace";
    li1.innerText = `Payable Amount :  ₹${totalgst.toFixed(2)}`;
    totals.appendChild(li);
    totals.appendChild(li2);
    totals.appendChild(li1);


}

function increase(){
  
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  const selectedPizza=productOperations.search(pizzaId,"+");
  printBasket();
  totalprice();
}
function decrease(){
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  const selectedPizza=productOperations.search(pizzaId,"-");
  printBasket();
  totalprice();
}

function preparePizza(pizza){
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.style = "width: 12rem;";
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardDiv.appendChild(cardBody);
  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.innerText = pizza.name;
  const pTag = document.createElement('p');
  pTag.className = 'card-text';
  pTag.innerText = `price: ₹${pizza.price}`;
  cardBody.appendChild(pTag);
  const container= document.createElement('p');
  container.style = "display: flex; align-items: center; width: 10rem; height:5rem";
  const qtag = document.createElement('p');
  qtag.className='card-text';
  qtag.innerText=  pizza.quantity; 
  const button1 = document.createElement('button');
  button1.setAttribute('product-id', pizza.id);
  button1.addEventListener('click', increase);
  button1.innerText = '+';
  container.appendChild(button1);
  container.appendChild(qtag);
  const button2 = document.createElement('button');
  button2.setAttribute('product-id', pizza.id);
  button1.className="btn btn-danger";
  button2.innerText = '-';
  button2.addEventListener('click', decrease);
  button2.className="btn btn-danger";
  container.appendChild(button2);
  cardBody.appendChild(container);
  return cardDiv;
}


function preparePizzaCard(pizza){
  const outputDiv = document.querySelector('#loaddata');
  const colDiv = document.createElement('div');
  colDiv.className = 'col-4';
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.style = "width: 18rem;";
  
  colDiv.appendChild(cardDiv);
  const img = document.createElement('img');
  img.src = pizza.url;
  img.className = 'card-img-top';
  cardDiv.appendChild(img);
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
  button.addEventListener('click', addToCart);// Event Bind3``+
  button.innerText = 'Add to Cart';
  button.className = 'btn btn-primary';

  cardBody.appendChild(h5);
  cardBody.appendChild(pTag);
  cardBody.appendChild(button);
  outputDiv.appendChild(colDiv);
}










// const rowdiv = document.getElementById('loaddata');
// let arrlength = pizza.length;
// for (let index = 0; index < arrlength; index++) {
//     const col= document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML=` 
//     <div class="card" style="width: 18rem;">
//     <img src="${pizza[index].url}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${pizza[index].name}</h5>
//       <p class="card-text">${pizza[index].desc}</p>
//       <a href="#" class="btn btn-primary">ADD to Cart</a>
//     </div>
//     </div>`;
//     rowdiv.appendChild(col);

//contain code  for fethching insertion , deletion etc
import Product from '../model/product.js';
import NetworkCall from './api-client.js';
const productOperations = {
    products:[], // Key:value
    search(pizzaId,val){
        const product = this.products.find(currentProduct=>currentProduct.id==pizzaId);
        console.log('Product Found ', product);
        if (val==="+"){product.quantity=product.quantity+1;}
        else{product.quantity=product.quantity-1;}
        console.log('Array ', this.products);
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product=>product.quantity);
        return productInBasket;
    },

    async loadProducts(){
        const pizzas = await NetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id, pizza.name,
                 pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
                return currentPizza;
                })
                console.log('********Product Array ', productsArray);
                this.products = productsArray;
                return productsArray;  // Wrap in Promise
            },
    
}
export default productOperations;

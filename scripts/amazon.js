import {cart,addtocart} from '../data/cart.js';
import {products} from '../data/products.js';
 

let mixeditem = '';
products.forEach((item)=>{
          mixeditem += 
                    `<div class="product-cont">
                    <div class="img-div">
                        <img class="img" src="${item.source}" alt="photo">
                    </div>
                    <div class="name">
                       ${item.name}
                    </div>
                    <div class="stars">
                        <img class="stars-img" src="${item.rating.stars}" alt="stars">
                        <div class="ratings">
                            ${item.rating.count}
                        </div>
                    </div>
                    <div class="cost">
                        &#36;${item.cost/100}
                    </div>
                    <div class="quantity">
                        <select class="selection">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div class="added-to-cart js-added-${item.id}">
                        <img class="check" src="icons/checkmark.png">
                        Added
                      </div>
                    <div class="addtocart" data-product-id="${item.id}">
                        Add to Cart
                    </div>
                 </div>`

});

console.log(cart);
updatecartquantity();
function updatecartquantity(){
    let totalquantity = 0;
    cart.forEach((but)=>{
        totalquantity += but.quantity;
        console.log(totalquantity);
    })
    document.querySelector(".cart-quantity").innerHTML = totalquantity;
}

document.querySelector(".products-grid").innerHTML = mixeditem; 

document.querySelectorAll(".addtocart").forEach((button) => {
    button.addEventListener("click",()=>{
    const productId = button.dataset.productId;
    addtocart(productId);
    updatecartquantity();
    console.log(cart);
})})

console.log(cart);

document.querySelectorAll(".addtocart").forEach((button)=>{
    button.addEventListener("click",()=>{
        let id = button.dataset.productId;
        let A = document.querySelector(`.js-added-${id}`);
        A.classList.add("visible");
        A.addEventListener('animationend', ()=>{
            A.classList.remove("visible");
        });
    })
});


// document.querySelectorAll(".selection").forEach((but)=>{
//     but.addEventListener("click",()=>{
//         console.log(document.querySelector(".selection").value);
//     });
// });
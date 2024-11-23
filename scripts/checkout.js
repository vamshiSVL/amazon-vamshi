import {cart,remove_item,display_cart,length_cart,updatecartquantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {delivaryoptions} from '../data/delivaryoptions.js';
// import { total_cost } from './amazon.js';

// var checkbox = document.querySelector(".check");
// checkbox.addEventListener('change',function(){
//     if(checkbox.checked){
//         document.querySelector(".place-order").innerHTML = `<p class="by"><span class="pay">Pay</span><span class="pal">Pal</span></p>`;
//         document.querySelector(".payment").innerHTML = `
//              <div class="payment">
//                 <div class="card">Debit or Credit Card</div>
//                 <p class="by">Powered by <span class="pay">Pay</span><span class="pal">Pal</span></p>
//             </div>
//         `;
//     }
//     else{
//         document.querySelector(".place-order").innerHTML = "Place your order";
//         document.querySelector(".payment").innerHTML = ``;
//     }
// });

function renderorderSummary(){
    hello();
    var total_item = "";
    console.log(cart);
    cart.forEach((cart_item)=>{
        let cart_name = cart_item.productid;
        let match_item;

        products.forEach((item)=>{
            if(cart_name == item.id){
                match_item = item;
            }
        });

        let time;
        delivaryoptions.forEach((item)=>{
            if(cart_item.deli_optionid == item.Did){
                time = item;
            }
        });

        const datey = dayjs();
        const deli = datey.add(time.Ddate, 'day');

    total_item  += `<div class="main-product js-main-product-${match_item.id}">
                        <div class="part1">
                            <div class="date"><h2 class="date-h2">Delivery date: ${deli.format('dddd, MMMM D')}</h2></div>
                            <div class="product">
                                <div class="image-div">
                                    <img src="${match_item.source}" alt="image" class="image">
                                </div>
                                <div class="two">
                                    <div class="pro-name"><h3>${match_item.name}</h3></div>
                                    <div class="pro-cost">$${(match_item.cost/100).toFixed(2)}</div>
                                    <div class="quantity">Quantity: ${cart_item.quantity}</div>
                                    <button class="update">Update</button>
                                    <button class="delete" data-product-delete="${match_item.id}">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div class="option">
                            <div class="choose"><h3>Choose a delivery option:</h3></div>
                            ${delivary(cart_item.productid,cart_item.deli_optionid)}
                        </div>
                    </div>`
    });

                document.querySelector(".fit").innerHTML = total_item;

    document.querySelector(".total").innerHTML = cart.length;
    // total_cost();

    document.querySelectorAll(".delete").forEach((del_item)=>{
        del_item.addEventListener("click",()=>{
            let deleted_item = del_item.dataset.productDelete;
            console.log(deleted_item);
            remove_item(deleted_item);
            display_cart();
            length_cart();
            // total_cost();
            console.log(cart);
        let ni =  document.querySelector(`.js-main-product-${deleted_item}`);
        ni.remove();
        });
    });

    // document.querySelectorAll(".update").forEach((part)=>{
    //     part.addEventListener("click", ()=>{
    //         document.querySelector(".quantity").innerHTML = `<input type="number" class="number">`;
    //         document.querySelector(".update").innerHTML = `<button class="update">save</button>`;
    //         document.querySelector(".update").addEventListener("click", ()=>{
    //             document.querySelector(".update").innerHTML = `<button class="update">update</button>`;

    //         })
    //     });
    // });

    function delivary(cart_item_productid,cart_item_deli_optionid){
        let Dhtml = '';
        delivaryoptions.forEach((Ditems)=>{
            const datey = dayjs();
            const deli = datey.add(Ditems.Ddate, 'day');

            Dhtml += 
            `
                <div class="radio" data-cart-id=${cart_item_productid} data-cart-optionid=${Ditems.Did}>
                    <input type="radio" name="date${cart_item_productid}" class="radio-but" data-radio-time="${deli.format('dddd, MMMM D')}" ${cart_item_deli_optionid == Ditems.Did ? 'checked' : ''}>
                    <label class="time">${deli.format('dddd, MMMM D')}<p>$${Ditems.Dcost == 0 ? 'FREE' : Ditems.Dcost/100}- Shipping</p></label>
                </div>
            `
        });

        return Dhtml;
    }

    document.querySelectorAll(".radio").forEach((but)=>{
        but.addEventListener("click",()=>{
            let cart_productid = but.dataset.cartId;
            let cart_optionid = but.dataset.cartOptionid;
            console.log(cart_productid,cart_optionid);
            console.log("going");
            updatecartquantity(cart_productid,cart_optionid);
            console.log(cart);
            renderorderSummary();
        });
    });
}

renderorderSummary();

total_cost();
   function total_cost(){
    let amount=0,tax_amount=0,A=0;
    let match_cart;
    let match_product;
    let deli_cost;
    let shipping_cost=0;
    let before_tax;
    let total_order;
    cart.forEach((item)=>{
        products.forEach((pro_item)=>{
            if(item.productid == pro_item.id){
                match_product = pro_item;
                match_cart = item;
            };
        });
        amount += (match_product.cost)*(match_cart.quantity);
        delivaryoptions.forEach((Ditem)=>{
            if(Ditem.Did == item.deli_optionid){
                deli_cost = Ditem.Dcost;
            }
        });
        shipping_cost += deli_cost;
    });
    before_tax = amount + shipping_cost;
    A =  before_tax*1/10;
    tax_amount = Math.round(A);
    total_order = before_tax+tax_amount;
    amount = amount/100;
    total_order = total_order /100;
    before_tax = before_tax / 100;
    shipping_cost = (shipping_cost/100).toFixed(2);
    tax_amount = tax_amount/100;

    document.querySelector(".total-2").innerHTML = cart.length;
    document.querySelector(".last-1").innerHTML = amount;
    document.querySelector(".last-2").innerHTML = shipping_cost;
    document.querySelector(".last-3").innerHTML = before_tax;
    document.querySelector(".last-4").innerHTML = tax_amount;
    document.querySelector(".costrupee").innerHTML = total_order;
}
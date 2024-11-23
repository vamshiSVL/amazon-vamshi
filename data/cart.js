export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    [{
        productid : 3,
        quantity : 1,
         deli_optionid : '1'
    },{
        productid : 2,
        quantity : 1,
         deli_optionid : '1'
    }];
}

console.log(cart);

function savetostorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId){
    let matchingitem;

    cart.forEach((pro)=>{
        if(productId === pro.productid){
            matchingitem = pro;
        }
    })

    if(matchingitem){
        matchingitem.quantity +=1;
    }
    else{
        cart.push({
            productid : productId,
            quantity : 1,
            deli_optionid : '1'
        })
        console.log("push");
    }
    savetostorage();
}

export function remove_item(deleted_item){
    let new_cart = [];
    cart.forEach((item)=>{
        if(item.productid != deleted_item){
            new_cart.push(item); 
        }
    });

    cart = new_cart;
    console.log(cart);
    savetostorage();
}

export function display_cart(){
    console.log("deleted");
    console.log(cart.length);
    if(cart.length == 0){
        document.querySelector(".fit").innerHTML = `Your cart is empty<br><br><a href="amazon.html"><button class="view">View products</button></a>`;
        document.querySelector(".fit").classList.add("fit-js");
    }
}

export function length_cart(){
    document.querySelector(".total").innerHTML = cart.length;
}


export function updatecartquantity(productId,Delivaryid){
    let matchingitem;

    cart.forEach((pro)=>{
        if(productId === pro.productid){
            matchingitem = pro;
        }
    })

    matchingitem.deli_optionid = Delivaryid;
    savetostorage();
    console.log('saved');
}
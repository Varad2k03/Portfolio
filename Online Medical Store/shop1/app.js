let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Azithromycin azee-500',
        image: '../mediciens img/Azithromycin azee-500.webp',
        price: 6
    },
    {
        id: 2,
        name: 'Omesiz',
        image: '../mediciens img/Omesiz.jpg',
        price: 600
    },
    {
        id: 3,
        name: 'Dolo 650',
        image: '../mediciens img/650-dolo-original-imag6bnjcu6nsxxp.webp',
        price: 500
    },
    {
        id: 4,
        name: 'Becosules',
        image: '../mediciens img/becosules-capsule.jpeg',
        price: 100
    },
    {
        id: 5,
        name: 'Buscogast',
        image: '../mediciens img/buscogast-plus.webp',
        price: 150
    },
    {
        id: 6,
        name: 'Ecosprin',
        image: '../mediciens img/ecosprin-150mg.jpeg',
        price: 350
    },
    {
        id: 7,
        name: 'Cyclopam',
        image: '../mediciens img/Cyclopam.webp',
        price: 6
    },
    {
        id: 8,
        name: 'Pantadoc DSR',
        image: '../mediciens img/pantodac DSR.webp',
        price: 6
    },
    {
        id: 9,
        name: 'R-cin 450',
        image: '../mediciens img/R-cin 450.webp',
        price: 6
    },
    {
        id: 10,
        name: 'Sinarest',
        image: '../mediciens img/Sinarest.jpeg',
        price: 6
    },
    {
        id: 11,
        name: 'Ultacet',
        image: '../mediciens img/Ultracet.jpeg',
        price: 6
    },
    {
        id: 12,
        name: 'Zerodol.jpeg',
        image: '../mediciens img/zerodol.jpeg',
        price: 6
    }
    
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹ ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = "Buy "+"₹"+totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function buy(){
    alert("Thank you for shopping with us");
    
}

function clearCard(){
    listCard.innerHTML = '';
    total.innerText = "Buy "+"₹"+0;
    quantity.innerText = 0;
}
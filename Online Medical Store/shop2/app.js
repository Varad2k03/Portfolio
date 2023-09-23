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
        name: 'Alex',
        image: '../Syp Img/alex.jpeg',
        price: 6
    },
    {
        id: 2,
        name: 'Aptivate',
        image: '../Syp Img/aptivate.jpg',
        price: 600
    },
    {
        id: 3,
        name: 'Becosules',
        image: '../Syp Img/Becosules-Syrup.jpg',
        price: 500
    },
    {
        id: 4,
        name: 'Benadryl',
        image: '../Syp Img/benadryl.webp',
        price: 100
    },
    {
        id: 5,
        name: 'Bevon',
        image: '../Syp Img/bevon_suspension_200ml_579263_3_1.jpg',
        price: 150
    },
    {
        id: 6,
        name: 'Cital',
        image: '../Syp Img/cital4.webp',
        price: 350
    },
    {
        id: 7,
        name: 'Duphalac Oral',
        image: '../Syp Img/duphalac_oral_solution_150ml_0_1.jpg',
        price: 6
    },
    {
        id: 8,
        name: 'Mucaine Gel',
        image: '../Syp Img/mucaine gel.jpg',
        price: 6
    },
    {
        id: 9,
        name: 'Mucolite',
        image: '../Syp Img/mucolite.jpg',
        price: 6
    },
    {
        id: 10,
        name: 'Riconia',
        image: '../Syp Img/Riconia.jpeg',
        price: 6
    },
    {
        id: 11,
        name: 'Sucrafil O Gel',
        image: '../Syp Img/sucrafil_o_sugar_free_gel_200ml_48596_0_2.jpg',
        price: 6
    },
    {
        id: 12,
        name: 'TusQ-dx',
        image: '../Syp Img/tusq-dx.jpg',
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
    alert("Thank You For Shopping With Us");
    
}

// Make function for clear element in cart after buy button is clicked
function clearCart(){
    listCard.innerHTML = '';
    total.innerText = "Buy "+"₹"+0;
    quantity.innerText = 0;
}
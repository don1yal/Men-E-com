const products = document.querySelector('.content_container');
const productList = products.querySelectorAll('.content');

const home = document.querySelector('.page-1');
const shops =document.querySelector('.page-2');
const about = document.querySelector('.page-3');
const contact = document.querySelector('.page-4');
home.style.display='block';
shops.style.display='none';
about.style.display='none';
contact.style.display='none';

const navBars = document.querySelector('.nav_bars');
console.log(navBars);
navBars.addEventListener('click',(event)=>{
  let select  = event.target;
  console.log(select);
  if(select.classList.contains('home')){
    home.style.display='block';
    shops.style.display='none';
    about.style.display='none';
    contact.style.display='none';
  }else if(select.classList.contains('shop')){
    home.style.display='none';
    shops.style.display='block';
    about.style.display='none';
     contact.style.display='none';
  }
  else if(select.classList.contains('about')){
    home.style.display='none';
    shops.style.display='none';
    about.style.display='block';
     contact.style.display='none';
  }else if(select.classList.contains('contact')){
    home.style.display='none';
    shops.style.display='none';
    about.style.display='none';
     contact.style.display='block';
  }
});

let form = document.querySelector('.form');
let fullName = document.querySelector('#fullname');
let emailAdress = document.querySelector('#emailadress');
let submit = document.querySelector('.submit-ftr');
submit.addEventListener('click',(event)=>{
    if(fullName.value!=='' && emailAdress.value!==''){
        localStorage.setItem('user',(fullName.value+","+emailAdress.value));
        console.log(localStorage.getItem('user'));
        alert('SUCCESS BRO')
    }else{
        console.log('ERROR INPUT');
        alert('ERROR BRO');
    }
});

let nameUser = document.querySelector('#context-from-name');
let emailUser = document.querySelector('#context-from-email');
let messageUser = document.querySelector('.contact-form-txtarea');
let submitCon = document.querySelector('.contact-form-btn');

submitCon.addEventListener('click',(event)=>{
    console.log(messageUser.value);
    if(nameUser.value!=='' &&  messageUser.value!==''){
        console.log(messageUser.value);  

        alert('SUCCES BRO');
    }
    else{
        alert('ERROR BRO');
    }
})




let secondProducts = document.querySelector('.content_containers');
let iconCart = document.querySelector('.iconCart');
let closeCart = document.querySelector('.close'); 
let body = document.querySelector('body');
let listProductsHTML = document.querySelector('.content_container');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.shopping_box span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})
/* add products in page*/
const addData = () =>{
    listProductsHTML.innerHTML= '';
    if(listProducts.length>0){
        listProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id; 
                newProduct.classList.add('content');
                newProduct.innerHTML = `
                    <img src="${product.img6}" alt="">
                    <h3>${product.name}</h3>
                    <p>${product.price}<span>USD</span></p>
                    <button class="addCart">Add To Cart</button>`;

                listProductsHTML.appendChild(newProduct);

            })
    }
}

const page2 = () =>{
     home.style.display='none';
     shops.style.display='block';
     about.style.display='none';
     contact.style.display='none';
}
const show = (product_id) =>{
    let index  = listProducts.findIndex((product)=>product.id==product_id);

        const name  = shops.querySelector('#name');
        const price = shops.querySelector('#price');
        const description = shops.querySelector('#description'); 
        let image = shops.querySelector('.images');
        let images = image.querySelectorAll('img');
        let photo = shops.querySelector('#photo');  
        console.log(index);
        
                name.innerHTML = listProducts[index].name;
                price.innerHTML =listProducts[index].price;
                description.innerHTML = listProducts[index].description;
                photo.src =listProducts[index].img1;

                images[0].src = listProducts[index].img2;
                images[1].src = listProducts[index].img3;
                images[2].src = listProducts[index].img4;
                images[3].src = listProducts[index].img5;
        
        secondProducts.innerHTML= '';
        if(listProducts.length>0){
            listProducts.forEach(product => {
                    let newProduct = document.createElement('div');
                    newProduct.dataset.id = product.id; 
                    newProduct.classList.add('content');
                    newProduct.innerHTML = `
                        <img src="${product.img6}" alt="">
                        <h3>${product.name}</h3>
                        <p>${product.price}<span>USD</span></p>
                        <button class="addCart">Add To Cart</button>`;
    
                    secondProducts.appendChild(newProduct);

                })
        }

  }

/*find the product_id to add shopping box*/
 secondProducts.addEventListener('click',(event) => {
    let positionClick = event.target;
    let product_id = positionClick.parentElement.dataset.id;
    if(positionClick.classList.contains('addCart')){
       addToCart(product_id);
    }else{
       page2();
       show(product_id);
       addData();
    }
})

listProductsHTML.addEventListener('click',(event) => {
     let positionClick = event.target;
     let product_id = positionClick.parentElement.dataset.id;
     if(positionClick.classList.contains('addCart')){
        addToCart(product_id);
     }else{
        page2();
        localStorage.setItem('select',product_id);
        show(product_id);
        addData();
     }
})

const addToCart = (product_id) =>{
    let positionProductInCart = carts.findIndex((value)=> value.product_id == product_id);
   if(carts.length<=0){
    carts = [{
        product_id: product_id,
        quantity:1
    }]
   }else if(positionProductInCart<0){
    carts.push({
        product_id:product_id,
        quantity:1
    })
   }else{
    carts[positionProductInCart].quantity++;
   }
   addCartToHTML();
   addCardToMemory();
} 

const addCardToMemory = () =>{
    localStorage.setItem('cart',JSON.stringify(carts));
}

const addCartToHTML = () =>{
    listCartHTML.innerHTML = '';
    let totalQuality = 0;
    if(carts.length>0){
        carts.forEach(cart =>{
            totalQuality+=cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct =listProducts.findIndex((value)=> value.id ==cart.product_id);
            let info =listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.img6}" alt="">
            </div>
            <div class="name">
                 ${info.name}
            </div>
            <div class="totalPrice">
                   $${Math.round((info.price*cart.quantity)*100)/100}
            </div>
            <div class="quantity">
               <span class="minus"><</span>
               <span>${cart.quantity}</span>
               <span class="plus">></span>
            </div>`;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerHTML = totalQuality;
}

const qunatity = (product,type) =>{
     let positionItemCart = carts.findIndex((value)=>value.product_id == product);
     if(positionItemCart>=0){
        
         switch(type){
            case 'plus':
                carts[positionItemCart].quantity++;
                break;
            default:
                if(carts[positionItemCart].quantity-1>0){
                    carts[positionItemCart].quantity--;
                }else{
                    carts.splice(positionItemCart,1);
                }   
                break; 
         }
     }
     console.log(carts);
     addCardToMemory();
     addCartToHTML();
}
listCartHTML.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
       let product = positionClick.parentElement.parentElement.dataset.id;
       console.log(product);
       let type = 'minus';
       if(positionClick.classList.contains('plus')){
        type = 'plus';
       }
       qunatity(product,type);
    }
})

/*start to js*/
const initApp = () =>{
    fetch('JSON/product.json')
    .then(response => response.json())
    .then(data =>{
         listProducts = data;
        console.log(listProducts);
        addData();

        if(localStorage.getItem('cart')){
             carts =JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

var slide = document.querySelector('.menus');

function openmenu(){
    slide.style.right='0';
}
function closemenu(){
    slide.style.right='-200px';
}
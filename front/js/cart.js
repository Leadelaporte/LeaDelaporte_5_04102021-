let articleId = new URL(location.href).searchParams.get("id");
let itemsPanier = getCart();
const url = "http://localhost:3000/api/products";
 
// fonction "getCart" qui recupere le panier ; utilisée plusieurs fois dans la page // 

function getCart() {
    let items = [];
    if (localStorage.getItem("panier") != null) {
      items = JSON.parse(localStorage.getItem("panier"));
    }
    return items;
  }

// insertion du HTML //

function displayArticles(cart){
    fetch(`http://localhost:3000/api/products`)
        .then(response => response.json())
        .then(data => { 
            let cart = getCart();
            let apiData = data;
            let cartData = cart;
            let divDisplay = document.getElementById("cart__items");
            for (let i = 0; i < cartData.length; i++){
                let product = apiData.find(function (d) {
                    return d._id === cartData[i].id;
                });
                console.log(cartData);
                divDisplay.innerHTML += `
                <article class="cart__item" data-id="${product._id}">
                    <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${cartData[i].color} - ${product.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p> 
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartData[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                        </div>
                    </div>
                </article>`
            }

        // Supprimer un élément du panier //

            let btnDelete = document.getElementsByClassName('deleteItem');
            console.log(btnDelete);

            for (let i=0; i < btnDelete.length; i++){
                btnDelete[i].addEventListener('click', () => {
                    btnDelete[i].closest("article").style.display="none";
                    let cart = getCart();
                    cart.splice([i],1);
                    localStorage.setItem('panier', JSON.stringify(cart));
                    
                    calculTotalPanier();
                })
            }

        // Changer la quantité dans le panier //

            let inputs = document.getElementsByClassName("itemQuantity");

            for(let i = 0;i<inputs.length;i++) {
                inputs[i].addEventListener('change', () => {
                    console.log("Changemnt de la quantité de " + i + " : " + inputs[i].value);
                    cart[i].quantity = parseInt(inputs[i].value);
                    localStorage.setItem('panier', JSON.stringify(cart));
                    calculTotalPanier();
                });
            }
        })
    
        .catch(function (err) {
            console.log(err);
        }) 
    

}
 // Fonction calcul panier //

function calculTotalPanier() {
    let cart = getCart();
    let totalQuantite = 0;
    let prixTotal = 0;

    fetch(`http://localhost:3000/api/products`)
        .then(response => response.json())
        .then(data => { 
            for(let i = 0;i<cart.length;i++) {
                let product = data.find(function (d) {
                    return d._id == cart[i].id
                });

                totalQuantite = totalQuantite + cart[i].quantity;
                console.log(cart[i].quantity)
                prixTotal = prixTotal + product.price * cart[i].quantity;

            }

            let quantiteTotal = document.getElementById("totalQuantity");
            quantiteTotal.innerHTML = totalQuantite;
            let totalPrix = document.getElementById("totalPrice");
            totalPrix.innerHTML = prixTotal;
            console.log(totalQuantite)
            console.log(prixTotal)
        });
}

// ---------------------------------------- Formulaire ---------------------------------------- // 

let form = document.getElementsByClassName("cart__order__form");
let formFirst = document.getElementById("firstName");
let formLast = document.getElementById("lastName");
let formAdress = document.getElementById("address");
let formCity = document.getElementById("city");
let formMail = document.getElementById("email");
let formValid = document.getElementById("order");

// Fristname // 

formFirst.addEventListener('change', function() {
    validFirst(this)
});
const validFirst =  function (inputFirst){
    let FirstRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testFirst = FirstRegExp.test(inputFirst.value)
    if(testFirst){
        formFirst.style.boxShadow ='0px 0px 10px green'
        formFirst.style.boxSizing = 'border-box'
    }else{
        formFirst.style.boxShadow ='0px 0px 10px red'
        formFirst.style.boxSizing = 'border-box'
        document.getElementById("firstNameErrorMsg").innerHTML = `"${inputFirst.value} n'est pas valide !"`
    }    
};

// Lastname // 

formLast.addEventListener('change', function() {
    validLast(this)
});
const validLast =  function (inputLast){
    let LastRegExp = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testLast = LastRegExp.test(inputLast.value)
    if(testLast){
        formLast.style.boxShadow ='0px 0px 10px green'
        formLast.style.boxSizing = 'border-box'
    }else{
        formLast.style.boxShadow ='0px 0px 10px red'
        formLast.style.boxSizing = 'border-box'
        document.getElementById("lastNameErrorMsg").innerHTML = `"${inputLast.value} n'est pas valide !"`
    }    
};

// Address //

formAdress.addEventListener('change', function() {
    validAdress(this)
});
const validAdress =  function (inputAdress){
    let AdressRegExp = new RegExp ('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testAdress = AdressRegExp.test(inputAdress.value)
    if(testAdress){
        formAdress.style.boxShadow ='0px 0px 10px green'
        formAdress.style.boxSizing = 'border-box'
    }else{
        formAdress.style.boxShadow ='0px 0px 10px red'
        formAdress.style.boxSizing = 'border-box'
        document.getElementById("addressErrorMsg").innerHTML = `"${inputAdress.value} n'est pas valide !"`
    }    
};

// City // 

formCity.addEventListener('change', function() {
    validCity(this)
});
const validCity =  function (inputCity){
    let villeRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
    let testVille = villeRegExp.test(inputCity.value)
    if(testVille){
        formCity.style.boxShadow ='0px 0px 10px green'
        formCity.style.boxSizing = 'border-box'
    }else{
        formCity.style.boxShadow ='0px 0px 10px red'
        formCity.style.boxSizing = 'border-box'
        document.getElementById("cityErrorMsg").innerHTML = `"${inputCity.value} n'est pas valide !"`
    }    
};

// Email // 

formMail.addEventListener('change', function() {
    validMail(this)
});
const validMail =  function (inputMail){
    let emailRegExp = new RegExp ('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testMail = emailRegExp.test(inputMail.value)
    if(testMail){
        formMail.style.boxShadow ='0px 0px 10px green'
        formMail.style.boxSizing = 'border-box'
    }else{
        formMail.style.boxShadow ='0px 0px 10px red'
        formMail.style.boxSizing = 'border-box'    
        document.getElementById("emailErrorMsg").innerHTML = `"${inputMail.value} n'est pas valide !"`
    }    
};

// Envoi du formulaire //

formValid.addEventListener("click", function(e) {
    e.preventDefault();
    if(
        !formFirst.value ||
        !formLast.value ||
        !formAdress.value ||
        !formCity.value ||
        !formMail.value
        
    ) {
        const btnCmd = document.getElementById('order')
        btnCmd.setAttribute('value', 'Veuillez remplir tous les champs')
        return e.preventDefault();
    }else{

    
const contact = {
      firstName: `${formFirst.value}`,
      lastName: `${formLast.value}`,
      address: `${formAdress.value}`,
      city: `${formCity.value}`,
      email: `${formMail.value}`
    }
    
    localStorage.setItem("contact", JSON.stringify(contact));


// Récupération des id //

    let products = []
    for(i = 0; i < itemsPanier.length; i++){
        products.push(itemsPanier[i].id)
    }

    let envoiProducts = {contact, products}
    console.log(envoiProducts);

    fetch("http://localhost:3000/api/products/order"  , {
        method: "POST",
        body: JSON.stringify(envoiProducts),
        headers: {
            "content-type" : "application/json",
        }   
    })

// Renvoie à la page de confirmation //

    .then(res => {
        return res.json();
    }).then((data) => {
        let orderId = data.orderId
       window.location.href= `./confirmation.html?id=${orderId}` ; 
    console.log(orderId);
    }).catch((error) =>{
        console.log(error);
    })
}
}
);

let cart = getCart();
console.log("Panier : ");
console.log(cart);
displayArticles();
calculTotalPanier();
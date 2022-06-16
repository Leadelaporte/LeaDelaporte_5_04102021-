// Récuperer les articles //
let articleId = new URL(location.href).searchParams.get("id");


// Appel Id //

fetch(`http://localhost:3000/api/products/${articleId}`)
.then(response => response.json())
.then(data => { 
    console.log(data);
    let produits = () => {
        return data
    }


let findProduct = produits()

let displayArticle = () => {
    // Ajout nom // 
    let productTitle = document.getElementById("title");
    productTitle.innerHTML = findProduct.name;
    //Ajout image//
    let productImage = document.getElementsByClassName("item__img");
    productImage[0].innerHTML = `<img src="${findProduct.imageUrl}" alt="${findProduct.altTxt}">`;
    // Ajout prix // 
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = findProduct.price;
    // Ajout description // 
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = findProduct.description;
    // Ajout couleur //
    let productColor = document.getElementById("colors");
    for (let i = 0; i < findProduct.colors.length; i++){
    productColor.innerHTML += `<option value="${findProduct.colors[i]}">${findProduct.colors[i]}</option>` 
    } 
}

displayArticle();

const btnClick = document.getElementById("addToCart");
    btnClick.addEventListener("click", () => {

        // Récuperation des valeurs //
        let quantity = document.getElementById("quantity").value;
        console.log("Quantité : " + quantity);
        
        let color = document.getElementById("colors").value;
        console.log("Couleur : " + color);

        let id = articleId;
        console.log("Id du produit : " + id);

        // Convertion en valeur quantité et prix
        let quantityArticle = parseInt(quantity);

        let lignePanier = {
            quantity: quantityArticle,
            color: color,
            id: articleId,
            name: findProduct.name,
            productImage: findProduct.imageUrl,
            altImage: findProduct.altTxt,
            //price: findProduct.price,
        };

        // Alert si quantité ou couleur incorrecte // 
        if (lignePanier.quantity < 1) {
            alert("Veuillez choisir une quantité.");
            return;
        }  
        if (lignePanier.color == "") {
            alert("Veuillez choisir une couleur.")
            return; 
        }

        // Ajout du produit dans le localStorage // 
        let ajoutLocalStorage = () => {
        
            // Ajout des valeurs dans le tableau //
            panier.push(lignePanier);
    
            // Mettre en JSON et envoyer la Key "panier" dans le localstorage // 
            localStorage.setItem("panier", JSON.stringify(panier)); 
         
        }

        // Variable pour récuperer les keys et les values dans localStorage // 
        let panier = JSON.parse(localStorage.getItem("panier"));

        // si deja produits //
        if(panier){
            let lignePanierExistInCart = false
            for (let f in panier){

                // si couleur ET id identique//
                if ((lignePanier.color == panier[f].color) && (lignePanier.id == panier[f].id)) {
                    lignePanierExistInCart = true

                    // ajout produit choisit et produit localstorage//
                    panier[f].quantity += parseInt(lignePanier.quantity);
                    // panier[f].price += lignePanier.price;

                    //renvoi localstorage //
                    localStorage.setItem("panier", JSON.stringify(panier));
                    
                }
            }
            if (lignePanierExistInCart == false){
                ajoutLocalStorage();
            }
        } else {
            // Création d'un tableau dans le localstorage // 
            panier = [];
            ajoutLocalStorage();
        }


    })
})
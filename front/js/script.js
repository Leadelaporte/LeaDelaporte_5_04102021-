

// Insertion des produits dans le DOM // 
function display (res){
    console.log("Je passe dans display");
    let divDisplay = document.getElementById("items");
    for (let i = 0; i < res.length; i++){
        console.log("Je passe dans la boucle");
        divDisplay.innerHTML += `
        <a href="./product.html?id=${res[i]._id}">
            <article>
                <img src="${res[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">${res[i].name}</h3>
                <p class="productDescription">${res[i].description} </p>
            </article>
        </a>`;
    }
}

// Récupération des articles dans l'API //
function getArticles() {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => { 
            console.log("Je suis passé par là");
            console.log(data);
            display(data);
        })
    
        .catch(function (err) {
            console.log(err);
        })
}

getArticles();

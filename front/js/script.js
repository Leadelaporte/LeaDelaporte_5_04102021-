// Insertion des produits dans le DOM // 
function displayArticles(res){
    let divDisplay = document.getElementById("items");
    for (let i = 0; i < res.length; i++){
        divDisplay.innerHTML += `
        <a href="./product.html?id=${res[i]._id}">
            <article>
                <img src="${res[i].imageUrl}" alt="${res[i].altTxt}">
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
            console.log(data);
            displayArticles(data);
        })
    
        .catch(function (err) {
            console.log(err);
        })
}

getArticles();

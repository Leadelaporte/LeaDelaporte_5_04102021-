function getArticleId() {
    return new URL(location.href).searchParams.get("id");
}

function getArticle(articleId) {
    fetch(`http://localhost:3000/api/products/${articleId}`)
    .then(response => response.json())
    .then(data => { 
        console.log("Je suis passé par là");
        console.log(data);
        displayArticle(data);
    })
    .catch(function (err) {
        console.log(err);
    })
}

function displayArticle(article) {
    // Ajout Image //
    let divDisplay = document.getElementsByClassName("item__img");
    divDisplay[0].innerHTML = `<img src="${article.imageUrl}" alt="Photographie d'un canapé">`;
    // Ajout prix // 
    let divPrice = document.getElementById("price");
    divPrice.innerHTML = article.price;
    // Ajout nom // 
    let divTitle = document.getElementById("title");
    divTitle.innerHTML = article.name;
    // Ajout description // 
    let divDescription = document.getElementById("description");
    divDescription.innerHTML = article.description;
    // Ajout couleur //
    let divColor = document.getElementById("colors");
    for (let i = 0; i < article.colors.length; i++){
    divColor.innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>` 
    } 
}

const articleId = getArticleId()
getArticle(articleId);
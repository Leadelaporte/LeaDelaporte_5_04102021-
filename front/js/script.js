// Récupération des articles dans l'API //

async function getArticles() {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => { 
            console.log(data);
        })
    
        .catch(function (err) {
            console.log(err);
        })
}

getArticles();

// Insertion des produits dans le DOM // 

function display (res){
    let divDisplay = document.getElementById("items");
    for (let i = 0; i < res; i++){
        divDisplay.innerHTML `
        <a href="./product.html?id=${res[i]._id}">
            <article>
                <img src="${res[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">${res[i].name}</h3>
                <p> class="productDescription">${res[i].description}</p>
            </article>
        </a>`;

    }
}

function saveIn(items){
    localStorage.setItem("items",JSON.stringify(items));
}

async function main(){
    const items = await getArticles();
}

main();

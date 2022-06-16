let articleId = new URL(location.href).searchParams.get("id");
console.log(articleId)
let order = document.getElementById("orderId");
order.innerHTML = articleId
localStorage.clear()

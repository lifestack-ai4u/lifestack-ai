async function searchProduct() {
  let query = document.getElementById("search").value;

  let res = await fetch("https://fakestoreapi.com/products");
  let data = await res.json();

  let filtered = data.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  filtered.sort((a, b) => a.price - b.price);

  let html = "";

  filtered.forEach(p => {
    html += `
      <div class="card">
        <h3>${p.title}</h3>
        <p>💲 ${p.price}</p>
        <img src="${p.image}" width="100">
      </div>
    `;
  });

  document.getElementById("results").innerHTML = html;
}

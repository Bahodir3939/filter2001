const fetchProperties = async (range, bedroom) => {
  const params = new URLSearchParams();

  params.append("range", range);
  params.append("bedroom", bedroom);

  const res = await fetch(`/property?${params}`);
  const data = await res.json();

  renderPropertiesUI(data);

  if (data.length > 0) {
    initialPrice(data);
  }
};

fetchProperties("[0,10000]", "any");

const renderPropertiesUI = (properties) => {
  const contDiv = document.getElementById("main-content");
  contDiv.innerHTML = "";

  const propertyCards = properties.map((property) => {
    const div = document.createElement("div");

    div.classList.add("property-card");

    div.innerHTML = `
      <img src="/${property.image}" alt="Property Image" />
      <div class="info">
        <h3>${property.name}</h3>
        <p>$${property.price} / month</p>
      </div>
    `;

    return div;
  });

  contDiv.append(...propertyCards);
};

const initialPrice = (properties) => {
  const prices = properties.map((pro) => pro.price);

  document.getElementById("min-price").value = Math.min(...prices);
  document.getElementById("max-price").value = Math.max(...prices);
};

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const minPrice = formData.get("min-price") || 0;
  const maxPrice = formData.get("max-price") || 10000;

  const range = `[${minPrice},${maxPrice}]`;
  const bedroom = formData.get("bedroom") || "any";

  fetchProperties(range, bedroom);
});
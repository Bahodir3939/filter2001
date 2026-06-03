const fetchProperties = async (range, bedroom) => {
  const params = new URLSearchParams();
  params.append("range", range);
  params.append("bedroom", bedroom);
const res = await fetch(`/property?${params}`);
  renderPropertiesUI(data);
  initialPrice(data);
};

fetchProperties("[0,10000]", "any");

const renderPropertiesUI = (properties) => {
  const contDiv = document.getElementById("main-content");
  contDiv.innerHTML = ``;

  const propertyCards = properties.map((property) => {
    const div = document.createElement("div");
    div.classList.add("property-card");
    div.innerHTML = `
<img src="/${property.image}" alt="Property Image" />            <h3>${property.name}</h3>
            <p>$${property.price} / month</p>
        </div>
        `;
    return div;
  });

  contDiv.append(...propertyCards);
};

const initialPrice = (properties) => {
  const prices = properties.map((pro) => pro.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  document.getElementById("min-price").value = minPrice;
  document.getElementById("max-price").value = maxPrice;
};

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const range = `[${formData.get("min-price")},${formData.get("max-price")}]`;
  const bedroom = formData.get("bedroom");
  console.log(bedroom);
  console.log(range);

  fetchProperties(range, bedroom);
});

// let data;
// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// import data from "./data.json";
// console.log(data);
let data;
function max(data) {
  return Math.max(...data.map((i) => i.amount));
}

function total(data) {
  return data.reduce((acc, obj) => acc + obj.amount, 0);
}

function findHeight(amount, maxAmount) {
  return Math.floor((amount / maxAmount) * 100);
}

function isToday(index) {
  let dayIndex = new Date().getDay() - 1;
  if (dayIndex === -1) return index === 6;

  return index === dayIndex;
}

function renderBars(data) {
  let result = "";
  const maxAmount = max(data);

  for (let i = 0; i < data.length; i++) {
    const { amount, day: label } = data[i];

    result += `<div 
      class="spending-chart__bar ${isToday(i) ? "active" : ""}"
      data-label="${label}" 
      data-amount="$${amount}" 
      style="--height: ${findHeight(amount, maxAmount)}%"
      tabindex="0">
      <p class="sr-only">
        ${isToday(i) ? "today" : label} - $${amount}
      </p>
    </div>`;
  }

  return result;
}

window.addEventListener("DOMContentLoaded", () => {
  const barsContainerElem = document.getElementById("spending-chart");
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      barsContainerElem.innerHTML = renderBars(data);
    });
});

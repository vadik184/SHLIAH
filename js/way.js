const searchInput = document.getElementById("searchInput");
const selectElementFrom = document.getElementById("mySelectFrom");
const selectElementTo = document.getElementById("mySelectTo");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const options = selectElementFrom.options || selectElementTo.options;

  for (let i = 0; i < options.length; i++) {
    const optionText = options[i].text.toLowerCase();
    if (optionText.indexOf(searchTerm) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
});
console.log("object");
const addButtonFrom = document.getElementById("addButtonFrom");
const addButtonTo = document.getElementById("addButtonTo");
const newWayInputFrom = document.getElementById("add-new-way-from");
const newWayInputTo = document.getElementById("add-new-way-to");
// const selectElement = document.getElementById("mySelect");

// Функція для додавання нового варіанту в select і localStorage
function addOption() {
  const newOption = newWayInputFrom.value || newWayInputTo.value;

  // Перевірка на пустий рядок
  if (newOption.trim() !== "") {
    // Створення нового елемента option
    const option = document.createElement("option");
    option.value = newOption;
    option.text = newOption;

    // Додавання опції в select
    selectElementFrom.appendChild(option) &&
      selectElementTo.appendChild(option);
    // Збереження всіх опцій в localStorage
    const options = Array.from(
      selectElementFrom.options && selectElementTo.options
    ).map((option) => option.value);
    localStorage.setItem("options", JSON.stringify(options));

    // Очищення поля введення
    newWayInput.value = "";
  }
}

// Додаємо слухач подій на кнопку
addButtonFrom.addEventListener("click", addOption);

// Відновлення опцій з localStorage при завантаженні сторінки
const storedOptions = JSON.parse(localStorage.getItem("options")) || [];
storedOptions.forEach((option) => {
  const newOption = document.createElement("option");
  newOption.value = option;
  newOption.text = option;
  selectElementFrom.appendChild(newOption) &&
    selectElementTo.appendChild(newOption);
});
addButtonTo.addEventListener("click", addOption);

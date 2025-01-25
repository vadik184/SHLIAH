const searchInput = document.getElementById("searchInput");
const selectElement = document.getElementById("mySelect");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const options = selectElement.options;

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
const addButton = document.getElementById("addButton");
const newWayInput = document.getElementById("add-new-way");
// const selectElement = document.getElementById("mySelect");

// Функція для додавання нового варіанту в select і localStorage
function addOption() {
  const newOption = newWayInput.value;

  // Перевірка на пустий рядок
  if (newOption.trim() !== "") {
    // Створення нового елемента option
    const option = document.createElement("option");
    option.value = newOption;
    option.text = newOption;

    // Додавання опції в select
    selectElement.appendChild(option);

    // Збереження всіх опцій в localStorage
    const options = Array.from(selectElement.options).map(
      (option) => option.value
    );
    localStorage.setItem("options", JSON.stringify(options));

    // Очищення поля введення
    newWayInput.value = "";
  }
}

// Додаємо слухач подій на кнопку
addButton.addEventListener("click", addOption);

// Відновлення опцій з localStorage при завантаженні сторінки
const storedOptions = JSON.parse(localStorage.getItem("options")) || [];
storedOptions.forEach((option) => {
  const newOption = document.createElement("option");
  newOption.value = option;
  newOption.text = option;
  selectElement.appendChild(newOption);
});

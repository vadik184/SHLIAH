const selectElementFrom = document.getElementById("mySelectFrom");
const selectElementTo = document.getElementById("mySelectTo");

const addButtonFrom = document.getElementById("addButtonFrom");
const addButtonTo = document.getElementById("addButtonTo");
const newWayInputFrom = document.getElementById("add-new-way-from");
const newWayInputTo = document.getElementById("add-new-way-to");
const searchInput = document.getElementById("searchInput");

// Функція для додавання нового варіанту в обидва select
function addOptionToBoth() {
  const newOptionFrom = newWayInputFrom.value.trim();
  const newOptionTo = newWayInputTo.value.trim();

  if (newOptionFrom) {
    addOption(selectElementFrom, newOptionFrom);
    addOption(selectElementTo, newOptionFrom);
  }

  if (newOptionTo) {
    addOption(selectElementFrom, newOptionTo);
    addOption(selectElementTo, newOptionTo);
  }

  // Збереження всіх опцій в localStorage
  saveOptionsToLocalStorage();

  // Очищення полів введення
  newWayInputFrom.value = "";
  newWayInputTo.value = "";
}

// Допоміжна функція для додавання опції в select
function addOption(selectElement, value) {
  const option = document.createElement("option");
  option.value = value;
  option.text = value;

  // Перевіряємо, чи вже є така опція
  const exists = Array.from(selectElement.options).some(
    (opt) => opt.value === value
  );

  if (!exists) {
    selectElement.appendChild(option);
  }
}

// Функція для збереження опцій в localStorage
function saveOptionsToLocalStorage() {
  const optionsFrom = Array.from(selectElementFrom.options).map(
    (option) => option.value
  );
  const optionsTo = Array.from(selectElementTo.options).map(
    (option) => option.value
  );

  localStorage.setItem("optionsFrom", JSON.stringify(optionsFrom));
  localStorage.setItem("optionsTo", JSON.stringify(optionsTo));
}

// Відновлення опцій з localStorage
function restoreOptionsFromLocalStorage() {
  const storedOptionsFrom =
    JSON.parse(localStorage.getItem("optionsFrom")) || [];
  const storedOptionsTo = JSON.parse(localStorage.getItem("optionsTo")) || [];

  storedOptionsFrom.forEach((option) => addOption(selectElementFrom, option));
  storedOptionsTo.forEach((option) => addOption(selectElementTo, option));
}

// Додаємо слухачі подій на кнопки
addButtonFrom.addEventListener("click", addOptionToBoth);
addButtonTo.addEventListener("click", addOptionToBoth);

// Відновлення опцій при завантаженні сторінки
restoreOptionsFromLocalStorage();

// Функція пошуку для обох select
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();

  // Функція для фільтрації опцій
  function filterOptions(selectElement) {
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
      const optionText = options[i].text.toLowerCase();
      if (optionText.indexOf(searchTerm) > -1) {
        options[i].style.display = "";
      } else {
        options[i].style.display = "none";
      }
    }
  }

  // Фільтруємо опції в обох списках
  filterOptions(selectElementFrom);
  filterOptions(selectElementTo);
});

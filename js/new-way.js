const selectElementFrom = document.getElementById("mySelectFrom");
const selectElementTo = document.getElementById("mySelectTo");

const addButtonFrom = document.getElementById("addButtonFrom");
const addButtonTo = document.getElementById("addButtonTo");
const newWayInputFrom = document.getElementById("add-new-way-from");
const newWayInputTo = document.getElementById("add-new-way-to");
const searchInput = document.getElementById("searchInput");

const startTimeInput = document.getElementById("add-start-time");
const endTimeInput = document.getElementById("add-end-time");

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

// Отримуємо елементи для роботи з пробігом
const kmStartInput = document.getElementById("km-start");
const kmEndInput = document.getElementById("km-end");
const kmManualInput = document.getElementById("km");
const kmInfo = document.querySelector(".km-info");

// Функція для оновлення інформації про пробіг
function updateKmInfo() {
  const kmStart = parseFloat(kmStartInput.value) || 0;
  const kmEnd = parseFloat(kmEndInput.value) || 0;
  const kmManual = parseFloat(kmManualInput.value);

  if (!isNaN(kmManual)) {
    // Якщо є введене значення вручну
    kmInfo.textContent = `Зазначена відстань: ${kmManual} км`;
  } else if (kmEnd > kmStart) {
    // Обчислення різниці між пробігом "до" і "після"
    const difference = kmEnd - kmStart;
    kmInfo.textContent = `Відстань: ${difference} км`;
  } else {
    kmInfo.textContent = "Відстань: невизначено";
  }
}

// Додаємо слухачі подій на поля
kmStartInput.addEventListener("input", updateKmInfo);
kmEndInput.addEventListener("input", updateKmInfo);
kmManualInput.addEventListener("input", updateKmInfo);

const mainList = document.getElementById("main-list");

// Функція для очищення форми, крім <select>
function resetForm() {
  startTimeInput.value = "";
  endTimeInput.value = "";
  kmStartInput.value = "";
  kmEndInput.value = "";
  kmManualInput.value = "";
  kmInfo.textContent = "Відстань: невизначено";
}

// Функція для додавання запису в список
function addDataToList(data) {
  clearPlaceholderIfExists(); // Видалити повідомлення, якщо існує

  const listItem = document.createElement("li");
  listItem.classList.add("data-line");

  const routeDiv = document.createElement("div");
  routeDiv.classList.add("current-way");
  routeDiv.textContent = `${data.from} → ${data.to}`;

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("current-time");
  timeDiv.textContent = `${data.startTime} - ${data.endTime}`;

  const distanceDiv = document.createElement("div");
  distanceDiv.classList.add("current-distance");
  if (data.kmManual !== null) {
    distanceDiv.textContent = `${data.kmManual} км`;
  } else if (data.kmStart !== null && data.kmEnd !== null) {
    distanceDiv.textContent = `${data.kmEnd - data.kmStart} км`;
  } else {
    distanceDiv.textContent = "Невідомо";
  }

  listItem.appendChild(routeDiv);
  listItem.appendChild(timeDiv);
  listItem.appendChild(distanceDiv);

  mainList.appendChild(listItem);
}

// Функція для збирання даних
function collectData() {
  const data = {
    from: selectElementFrom.value,
    to: selectElementTo.value,
    startTime: startTimeInput.value,
    endTime: endTimeInput.value,
    kmStart: parseFloat(kmStartInput.value) || null,
    kmEnd: parseFloat(kmEndInput.value) || null,
    kmManual: parseFloat(kmManualInput.value) || null,
  };

  // Додаємо новий запис у список
  addDataToList(data);

  // Зберігаємо дані в Local Storage
  saveDataToLocalStorage(data);

  // Очищуємо форму після збереження
  resetForm();
}

// Додаємо слухач події на кнопку збереження
const saveButton = document.getElementById("save-data");
saveButton.addEventListener("click", collectData);

// Функція для додавання "порожнього" повідомлення, якщо даних ще немає
function addPlaceholderIfEmpty() {
  if (!mainList.querySelector(".data-line")) {
    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");
    placeholder.textContent = "Дані поки що відсутні. Додайте новий запис.";
    mainList.appendChild(placeholder);
  }
}

// Функція для видалення "placeholder", якщо додається запис
function clearPlaceholderIfExists() {
  const placeholder = mainList.querySelector(".placeholder");
  if (placeholder) {
    placeholder.remove();
  }
}

// Функція для збереження даних у Local Storage
function saveDataToLocalStorage(data) {
  const storedData = JSON.parse(localStorage.getItem("routes")) || [];
  storedData.push(data);
  localStorage.setItem("routes", JSON.stringify(storedData));
}

// Функція для відновлення даних із Local Storage
function restoreDataFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("routes")) || [];
  storedData.forEach((data) => addDataToList(data));
}

// Відновлення даних при завантаженні сторінки
restoreDataFromLocalStorage();
addPlaceholderIfEmpty();

// Функція для завантаження даних як текстовий файл
function downloadDataAsText() {
  const storedData = JSON.parse(localStorage.getItem("routes")) || [];
  let textContent = storedData
    .map(
      (data) =>
        `Маршрут: ${data.from} → ${data.to}\nЧас: ${data.startTime} - ${
          data.endTime
        }\nВідстань: ${
          data.kmManual || data.kmEnd - data.kmStart || "Невідомо"
        } км\n`
    )
    .join("\n");

  const blob = new Blob([textContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "routes.txt";
  link.click();

  // Очищення Local Storage після завантаження
  localStorage.removeItem("routes");
  mainList.innerHTML = ""; // Очищення списку на сторінці
  addPlaceholderIfEmpty(); // Додавання "порожнього" повідомлення
}

// Додаємо слухач події на кнопку для експорту
const exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", downloadDataAsText);

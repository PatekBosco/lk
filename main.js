// Тестовые учетные данные
const TEST_CREDENTIALS = {
  username: "admin",
  password: "password",
};

// Элементы DOM
const contentContainer = document.getElementById("contentContainer");
const authContainer = document.getElementById("authContainer");
const dashboardContent = document.getElementById("dashboardContent");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginButton = document.getElementById("loginButton");
const buttonText = document.getElementById("buttonText");
const passwordToggle = document.getElementById("passwordToggle");
const logoutButton = document.getElementById("logoutButton");
const forgotPasswordLink = document.getElementById("forgotPassword");
const contactSupportLink = document.getElementById("contactSupport");

// Переключение видимости пароля
passwordToggle.addEventListener("click", function () {
  const icon = this.querySelector("i");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// Обработка отправки формы
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Сброс ошибок
  resetErrors();

  // Получение значений
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Валидация
  let isValid = true;

  if (!username) {
    showError(usernameError, "Введите логин");
    isValid = false;
  }

  if (!password) {
    showError(passwordError, "Введите пароль");
    isValid = false;
  }

  if (!isValid) return;

  // Показываем загрузку
  showLoading(true);

  // Имитация запроса к серверу
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Проверка учетных данных
  if (
    username === TEST_CREDENTIALS.username &&
    password === TEST_CREDENTIALS.password
  ) {
    // Успешный вход
    showLoading(false);
    loginSuccess();
  } else {
    // Неправильные учетные данные
    showLoading(false);

    if (username !== TEST_CREDENTIALS.username) {
      showError(usernameError, "Неправильный логин");
      usernameInput.classList.add("error");
    } else {
      showError(passwordError, "Неправильный пароль");
      passwordInput.classList.add("error");
    }
  }
});

// Выход из системы
logoutButton.addEventListener("click", function () {
  contentContainer.classList.remove("logged-in");
  loginForm.reset();
  resetErrors();
  alert("Вы успешно вышли из системы");
});

// Восстановление пароля
forgotPasswordLink.addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Функция восстановления пароля находится в разработке. Обратитесь к администратору."
  );
});

// Связь с поддержкой
contactSupportLink.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Телефон поддержки: +7 (999) 123-45-67\nEmail: support@bankrupt.ru");
});

// Вспомогательные функции
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function resetErrors() {
  usernameError.style.display = "none";
  passwordError.style.display = "none";
  usernameInput.classList.remove("error");
  passwordInput.classList.remove("error");
}

function showLoading(isLoading) {
  const spinner = loginButton.querySelector(".fa-spinner");
  if (isLoading) {
    loginButton.classList.add("loading");
    buttonText.textContent = "Вход...";
    spinner.style.display = "inline-block";
    loginButton.disabled = true;
  } else {
    loginButton.classList.remove("loading");
    buttonText.textContent = "Войти";
    spinner.style.display = "none";
    loginButton.disabled = false;
  }
}

function loginSuccess() {
  contentContainer.classList.add("logged-in");
}

// Функции для работы с прогресс-баром
function toggleStageDetails(stageNumber) {
  const content = document.getElementById(`stage-content-${stageNumber}`);
  const header = content.parentElement.querySelector(".stage-header");

  content.classList.toggle("active");
  header.classList.toggle("active");
}

// Функция для переключения раскрытия деталей этапа
function toggleStageDetails(stageNumber) {
  const content = document.getElementById(`stage-content-${stageNumber}`);
  const header = content.parentElement.querySelector(".stage-header");

  // Переключаем класс active у контента
  content.classList.toggle("active");
  header.classList.toggle("active");

  // Закрываем другие открытые этапы (опционально)
  // Если нужно, чтобы одновременно мог быть открыт только один этап:
  document.querySelectorAll('.stage-content').forEach(el => {
  if (el.id !== `stage-content-${stageNumber}`) {
  el.classList.remove('active');
  el.parentElement.querySelector('.stage-header').classList.remove('active');
  }
  });
}

// Автоматическое открытие текущей стадии при загрузке
document.addEventListener("DOMContentLoaded", function () {
  // Открываем текущую стадию (№2)
  toggleStageDetails(2);

  // Добавляем обработчики для точек прогресса
  document.querySelectorAll(".stage-point").forEach((point) => {
    point.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  // Добавляем обработчики для заголовков этапов
  document.querySelectorAll(".stage-title").forEach((title) => {
    if (!title.closest(".stage-header")) {
      title.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
  });
});


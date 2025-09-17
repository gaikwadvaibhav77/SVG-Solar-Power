let translations = {};
let currentLang = localStorage.getItem("lang") || "en";

// Load translation file
async function loadLanguage(lang) {
  const response = await fetch(`/locales/${lang}.json`);
  translations = await response.json();
  currentLang = lang;
  localStorage.setItem("lang", lang);
  translatePage();
  // Set dropdown value correctly
  const selectBox = document.getElementById("langSwitcher");
  if (selectBox) selectBox.value = lang;
}

// Replace text based on data-i18n keys
function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });
}

// Switch language
function setLanguage(lang) {
  loadLanguage(lang);
}

// Load default language
document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
});

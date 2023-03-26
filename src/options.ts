import translator from "./translator";

const fontSelector = document.querySelector("#fontSelector");
const prevFontBtn = document.querySelector("#prevFont");
const nextFontBtn = document.querySelector("#nextFont");

if (fontSelector && fontSelector instanceof HTMLSelectElement) {
  const options = fontSelector.options;
  const optionCount = options.length;

  let currentIndex = 0;

  if (prevFontBtn)
    prevFontBtn.addEventListener("click", function () {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : optionCount - 1;
      fontSelector.selectedIndex = currentIndex;
    });

  if (nextFontBtn)
    nextFontBtn.addEventListener("click", function () {
      currentIndex = currentIndex < optionCount - 1 ? currentIndex + 1 : 0;
      fontSelector.selectedIndex = currentIndex;
    });
}

export function SetOptions() {
  if (!fontSelector || !(fontSelector instanceof HTMLSelectElement)) return;
  document.documentElement.style.setProperty(
    "--primary-font",
    `${fontSelector.value}`
  );
}

const languageSelector = document.querySelector(
  "#languageSelector"
)! as HTMLSelectElement;
const prevLanguageBtn = document.querySelector("#prevLanguage");
const nextLanguageBtn = document.querySelector("#nextLanguage");

if (languageSelector) {
  const options = languageSelector.options;
  const optionCount = options.length;

  let currentIndex = 0;

  if (prevLanguageBtn)
    prevLanguageBtn.addEventListener("click", function () {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : optionCount - 1;
      languageSelector.selectedIndex = currentIndex;
      translator.changeLanguage(options[currentIndex].value);
    });

  if (nextLanguageBtn)
    nextLanguageBtn.addEventListener("click", function () {
      currentIndex = currentIndex < optionCount - 1 ? currentIndex + 1 : 0;
      languageSelector.selectedIndex = currentIndex;
      translator.changeLanguage(options[currentIndex].value);
    });

    // languageSelector.addEventListener('change', function () {
    //   const selectedValue = languageSelector.value;
    //   console.log(selectedValue);
    //   translator.changeLanguage(selectedValue);
    // });
}


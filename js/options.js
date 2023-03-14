const fontSelector = document.getElementById('fontSelector');
const prevFontBtn = document.getElementById('prevFont');
const nextFontBtn = document.getElementById('nextFont');

const options = fontSelector.options;
const optionCount = options.length;

let currentIndex = 0;

prevFontBtn.addEventListener('click', function() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : optionCount - 1;
  fontSelector.selectedIndex = currentIndex;
});

nextFontBtn.addEventListener('click', function() {
  currentIndex = currentIndex < optionCount - 1 ? currentIndex + 1 : 0;
  fontSelector.selectedIndex = currentIndex;
});

function SetOptions() {
    document.documentElement.style.setProperty('--primary-font', `${fontSelector.value}`);
}
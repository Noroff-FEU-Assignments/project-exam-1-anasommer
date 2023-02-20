function message(error) {
  return `<div class="error">${error}</div>`;
}

function updateElement(element, className) {
  element.classList.remove(className);
  element.innerHTML = "";
}

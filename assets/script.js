const getScreen = document.getElementById('screen');
getScreen.textContent = 0;

const getNumberButton = document.querySelectorAll('[data-number]')
getNumberButton.forEach((button) => {
  button.addEventListener('click', () => {
    getScreen.textContent = button.textContent;
  })
})

const loginBtn = document.querySelector('#login');
const registerBtn = document.querySelector('#register');
const parent = document.querySelector('.parent_')

loginBtn.addEventListener('click', () => {
  parent.classList.add('moveLogin');
  parent.classList.remove('moveRegister')
})
registerBtn.addEventListener('click', () => {
  parent.classList.remove('moveLogin');
  parent.classList.add('moveRegister')
})

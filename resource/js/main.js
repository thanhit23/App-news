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

// fetch('http://localhost:8000/v1/authen/login', {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify({
//       "email": "khoi@gmail.com",
//       "password": "12345678910"
//     })
//   }).then(data => {
//     console.log(data);
//   })

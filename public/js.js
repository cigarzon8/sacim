'use strict'
window.onload = function(e){ 
    (function () {
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }      
              form.classList.add('was-validated')
            }, false)
          })
      })()
}

function showpassword(item,itemeye){
  let password =  document.getElementById(item)
  let eye =  document.getElementById(itemeye)
  if (password.type == 'password'){
    password.type = 'text'
    eye.className = 'fas fa-eye'
  }else{
    password.type = 'password'
    eye.className = 'fas fa-eye-slash'
  }
}
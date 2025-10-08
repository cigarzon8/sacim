'use strict'
window.onload = function () {
  const forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms).forEach(function (form) {
    // Validación al enviar
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);

    // Validación en tiempo real por input o blur
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(function (field) {
      const validateField = () => {
        if (field.checkValidity()) {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        } else {
          field.classList.remove('is-valid');
          field.classList.add('is-invalid');
        }
      };

      field.addEventListener('input', validateField);
      field.addEventListener('blur', validateField);
    });
  });
};
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
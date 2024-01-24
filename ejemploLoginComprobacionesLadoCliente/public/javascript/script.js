document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var isValid = true;

    // Validación del nombre
    if (name.length < 3) {
        document.getElementById('errorName').innerText = 'El nombre debe tener al menos 3 caracteres.';
        document.getElementById('errorName').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errorName').style.display = 'none';
    }

    // Validación del email (se apoya en la validación automática del navegador por el tipo de input)
    if (email.indexOf('@') === -1) {
        document.getElementById('errorEmail').innerText = 'Ingrese una dirección de correo electrónico válida.';
        document.getElementById('errorEmail').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errorEmail').style.display = 'none';
    }

    // Validación de la contraseña
    if (password.length < 8) {
        document.getElementById('errorPassword').innerText = 'La contraseña debe tener al menos 8 caracteres.';
        document.getElementById('errorPassword').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errorPassword').style.display = 'none';
    }

    // Si todas las validaciones son correctas, se puede proceder a enviar el formulario (simulado aquí)
    if (isValid) {
        document.getElementById('registerForm').submit();
    } else {
        alert('Formulario no enviado con exito')
    }
});

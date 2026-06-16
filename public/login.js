// Escucha cuando el formulario se envía
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // Evita que la página se recargue al hacer submit
    e.preventDefault();

    // Lee los valores que escribió el usuario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Oculta el mensaje de error por si estaba visible de antes
    document.getElementById('error_msg').style.display = 'none';

    try {
        // Hace la petición POST a la API
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Convierte el objeto a JSON para enviarlo
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el token JWT en localStorage para usarlo en otras peticiones
            localStorage.setItem('token', data.token);

            // Redirige al dashboard (lo creamos después)
            window.location.href = '/dashboard.html';
        } else {
            // Si las credenciales son incorrectas muestra el mensaje de error
            document.getElementById('error_msg').style.display = 'block';
        }

    } catch (error) {
        // Si hay un error de red o de servidor
        console.error('Error al iniciar sesión:', error);
        document.getElementById('error_msg').style.display = 'block';
    }
});
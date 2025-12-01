document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get user input (temp for testing)
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple Validation
            if (email && password) {
                localStorage.setItem('dartflix_logged_in', 'true');
                localStorage.setItem('dartflix_user_email', email);
                window.location.href = '../index.html'; 
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
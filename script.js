document.getElementById('submitBtn').addEventListener('click', function(event) {
    const userGuess = document.getElementById('userGuess').value;
    const messageDiv = document.getElementById('message');

    if (userGuess === secretWord) {
        messageDiv.textContent = 'Congratulations! You guessed the right word.';
    } else {
        messageDiv.textContent = 'Sorry, that\'s not correct. Try again.';
        event.preventDefault();  // This stops the form from submitting if the guess is wrong
    }

    messageDiv.classList.add('active');
    setTimeout(() => {
        messageDiv.classList.remove('active');
    }, 3000); 
});

document.getElementById("userGuess").addEventListener("input", function() {
    const placeholderLabel = document.getElementById("placeholderLabel");
    if (this.value) {
        placeholderLabel.style.display = 'none';
    } else {
        placeholderLabel.style.display = 'block';
    }
});

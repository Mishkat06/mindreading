document.addEventListener('DOMContentLoaded', function() {

    const userGuessInput = document.getElementById("userGuess");
    const placeholderLabel = document.getElementById("placeholderLabel");
    const submitBtn = document.getElementById('submitBtn');
    const formContainer = document.getElementById("formContainer");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    userGuessInput.addEventListener("input", function() {
        if (this.value) {
            placeholderLabel.style.display = 'none';
        } else {
            placeholderLabel.style.display = 'block';
        }
    });

    const guessForm = document.getElementById("guessForm");
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
    
        const userGuess = userGuessInput.value.trim();
    
        if (!userGuess) {
            showPopup('Do not type only numbers!');
        } else if (!isNaN(userGuess)) {
            showPopup('Please type your name!');
        } else {
            // Start the fetch operation here
            fetch('https://formspree.io/f/mnqkqkpe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userGuess=${userGuess}`
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to submit data');
                }
            })
            .then(data => {
                // If the submission was successful, show the welcome popup.
                showPopup('Welcome ' + userGuess, function() {
                    showInstructionPopup();
                });
                formContainer.style.display = "none";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
                // You can show another popup here indicating the error if needed.
            });
        }
    });
    
    
    function showPopup(message, callback) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
        
        setTimeout(() => {
            popup.querySelector('.popup-content').classList.add('show');
        }, 10); 
    
        setTimeout(() => {
            popup.querySelector('.popup-content').classList.remove('show');
            setTimeout(() => {
                popup.style.display = "none";
                if(callback) callback();  // Call the callback function if provided
            }, 500); // Wait for the transition to complete
        }, 3000); // Display the popup for 3 seconds
    }
    
    
    
    function showInstructionPopup() {
        const instructionPopup = document.getElementById("instructionPopup");
        
        setTimeout(() => {
            topMessage.style.opacity = "1"; // Fade in
        }, 10);
    
        // Existing code to display the instruction popup
        instructionPopup.style.display = "flex";
        setTimeout(() => {
            instructionPopup.querySelector('.popup-content').classList.add('show');
        }, 10); 
    }
    
    document.getElementById('understandButton').addEventListener('click', function() {
        const instructionPopup = document.getElementById("instructionPopup");
        const textPopup = document.getElementById("textPopup");
        
        // Hide the instruction popup
        instructionPopup.style.display = "none";
        instructionPopup.querySelector('.popup-content').classList.remove('show');
        
        // Display the new text popup
        textPopup.style.display = "flex";
        setTimeout(() => {
            textPopup.querySelector('.popup-content').classList.add('show');
        }, 10);
        
        // Display the top message
        const topMessage = document.getElementById("topMessage");
        topMessage.style.display = "block";
        setTimeout(() => {
            topMessage.style.opacity = "1"; // Fade in after a small delay
        }, 200); // Fade in after 200ms
    });
    
    document.getElementById('closeTextPopup').addEventListener('click', function() {
        const textPopup = document.getElementById("textPopup");
        
        // Hide the text popup
        textPopup.style.display = "none";
        textPopup.querySelector('.popup-content').classList.remove('show');
    });
    
});




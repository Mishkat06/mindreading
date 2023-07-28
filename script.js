document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();  // Prevents the form from redirecting
    
    const userGuess = document.getElementById('userGuess').value;

    // Display the modal
    const modal = document.getElementById("congratsModal");
    modal.style.display = "block";

    // Close the modal after a few seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
});

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

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const userGuess = userGuessInput.value.trim();

        if (!userGuess) {
            showPopup('Do not type only numbers!');
        } else if (!isNaN(userGuess)) {
            showPopup('Please type your name!');
        } else {
            showPopup('Welcome ', function() {
                // Show the instruction popup after the congrats popup
                showInstructionPopup();
            });
            formContainer.style.display = "none"; // Hide the form container after showing the congrats popup
        }
        
    });

    function showPopup(message, callback) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
        setTimeout(() => {
            popup.classList.add("show");
        }, 10); // Wait 10ms to ensure that the display style has changed
    
        setTimeout(() => {
            popup.classList.remove("show");
            popup.style.display = "none";
            if (callback) {
                callback();
            }
        }, 2000); // Hide the popup after 3 seconds
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

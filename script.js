document.addEventListener('DOMContentLoaded', function() {
    const lastPopupCloseBtn = document.getElementById("closeTextPopup");
    const topMessage = document.querySelector(".top-message");
    let currentLetterIndex = 0; 
    let totalLetters = 0; 

    lastPopupCloseBtn.addEventListener("click", function() {
        topMessage.style.display = "block";
        setTimeout(function() {
            topMessage.style.opacity = "1";
        }, 50);
    });

    document.getElementById('lettersCountSubmit').addEventListener('click', function() {
        totalLetters = parseInt(document.getElementById('lettersCountInput').value);

        if (isNaN(totalLetters) || totalLetters <= 0) {
            alert('Please enter a valid number!');
            return;
        }

        document.getElementById("lettersCountPopup").style.display = "none";
        askForNextLetter();
    });

    let selectedSets = [];

    function askForNextLetter() {
        if (currentLetterIndex < totalLetters) {
            const question = `Where is your ${ordinalSuffixOf(currentLetterIndex + 1)} letter?`;
            document.getElementById("setSelectionMessage").textContent = question;
            showSetSelectionPopup();
        } else {
            console.log(selectedSets); // Just logging the selected sets. You can process them as needed.
            currentLetterIndex = 0;
            totalLetters = 0;
            selectedSets = [];
        }
    }
    
    function showSetSelectionPopup() {
        const popup = document.getElementById("setSelectionPopup");
        const popupContent = popup.querySelector(".popup-content");
        popup.style.display = "flex";
        popupContent.classList.add('fade-in');
        popupContent.style.transform = "scale(1)";
    }
    
    document.querySelectorAll(".set-button").forEach(button => {
        button.addEventListener('click', (e) => {
            selectedSets.push(e.target.getAttribute('data-set'));
            currentLetterIndex++;
            document.getElementById("setSelectionPopup").style.display = "none";
            askForNextLetter();
        });
    });
    

    function ordinalSuffixOf(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    function showLettersCountPopup() {
        document.getElementById("lettersCountPopup").style.display = "flex";
    }

    const userGuessInput = document.getElementById("userGuess");
    const placeholderLabel = document.getElementById("placeholderLabel");
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector('.popup-content');
    const popupMessage = document.getElementById("popupMessage");

    userGuessInput.addEventListener("input", function() {
        placeholderLabel.style.display = this.value ? 'none' : 'block';
    });

    document.getElementById("guessForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const userGuess = userGuessInput.value.trim();

        if (!userGuess) {
            showPopup('Please type your name!', false);
        } else if (!isNaN(userGuess)) {
            showPopup('Do not type only numbers!', false);
        } else {
            showPopup('Welcome ' + userGuess, true);
        }
    });

    function showPopup(message, showInstructionsAfter) {
        popupMessage.textContent = message;
        popup.style.display = 'flex';
        popupContent.classList.remove('fade-out');
        popupContent.classList.add('fade-in');
    
        setTimeout(function() {
            hidePopup();
    
            if (showInstructionsAfter) {
                setTimeout(function() {
                    showInstructionPopup();
                }, 200);
            }
        }, 2000);
    }
    
    function hidePopup() {
        popupContent.classList.remove('fade-in');
        popupContent.classList.add('fade-out');
        
        setTimeout(function() {
            popup.style.display = 'none';
        }, 500);
    }

    function showInstructionPopup() {
        const instructionPopup = document.getElementById("instructionPopup");
        const formContainer = document.getElementById("formContainer");
        const popupContent = instructionPopup.querySelector(".popup-content");
        
        formContainer.style.display = "none";
        instructionPopup.style.display = "flex";
        popupContent.classList.add('fade-in');
        popupContent.style.transform = "scale(1)";
    }

    document.getElementById('understandButton').addEventListener('click', function() {
        const instructionPopup = document.getElementById("instructionPopup");
        const textPopup = document.getElementById("textPopup");
        const textPopupContent = textPopup.querySelector('.popup-content');
    
        instructionPopup.querySelector('.popup-content').classList.remove('fade-in', 'show');
        instructionPopup.querySelector('.popup-content').classList.add('fade-out');
        
        setTimeout(() => {
            instructionPopup.style.display = "none";
            textPopup.style.display = "flex";
            textPopupContent.classList.add('fancy-popup-show');
        }, 500);
    });

    document.getElementById('closeTextPopup').addEventListener('click', function() {
        const textPopup = document.getElementById("textPopup");
        
        textPopup.querySelector('.popup-content').classList.remove('show');
        setTimeout(() => {
            textPopup.style.display = "none";
            showLettersCountPopup();
        }, 500);
    });
});

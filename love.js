document.addEventListener('click', function() {
    const audio = document.getElementById('fate');
    // Check if the audio is not already playing
    if (audio.paused) {
        audio.play();
    }
});

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Fun Fact:",
    "heyyy",
    "Guess what",
    "I",
    "Love",
    "you",
    "so",
    "so so",
    "so so so",
    "so so so so",
    "so so so so so",
    "so so so so so so",
    "much",
    "Michelle",
];

const morphTime = 1.25;
const cooldownTime = 0.25;

let textIndex = 0;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;
    
    let fraction = morph / morphTime;
    
    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }
    
    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;
    
    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";
    
    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;
    
    cooldown -= dt;
    
    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }
        
        if (textIndex >= texts.length - 1) { // Check for animation end
            doCooldown(); // Ensure the last text is properly shown without blur.
            animationEnded = true; // Set the flag to true to indicate animation end
            displayFinalText(); // Call the function to display the final text
            return; // Stop the animation loop.
        }
        
        doMorph();
    } else {
        doCooldown();
    }
    
    requestAnimationFrame(animate);
    if (animationEnded) {
        displayFinalText(); // Ensure the final text is checked to be displayed in every frame after ending
    }
}


let animationEnded = false; // Flag to track the end of the animation
function displayFinalText() {
    if (animationEnded && !document.getElementById("finalText")) {
        const finalTextElement = document.createElement("div");
        finalTextElement.id = "finalText";
        document.body.appendChild(finalTextElement); // Append the new element to the body or a specific container

        // Define the text you want to type out
        const finalText = "my little cutie patootie pumpkin pie ice spice chicken nugget!";

        // Initialize a variable to keep track of the current index of the string
        let currentIndex = 0;

        // Function to add a character
        function typeCharacter() {
            if (currentIndex < finalText.length) {
                // Add the next character to the element's text content
                finalTextElement.textContent += finalText.charAt(currentIndex);
                currentIndex++;
                // Call the function again after a short delay to add the next character
                setTimeout(typeCharacter, 100); // Adjust the typing speed with the timeout value (in milliseconds)
            } else {
                // Once typing is complete, make the "Go to Timeline" button visible
                makeTimelineButtonVisible();
            }
        }

        // Start typing out the text
        typeCharacter();
    }
}

// Function to make the "Go to Timeline" button visible
function makeTimelineButtonVisible() {
    const timelineButton = document.querySelector(".navigate-timeline-button");
    if (timelineButton) {
        timelineButton.style.display = "block"; // Make the button part of the document flow
        requestAnimationFrame(() => {
            // This ensures the display change has taken effect before the transition begins
            timelineButton.style.opacity = "1";
            timelineButton.style.transform = "translateY(0)"; // Move to final position
        });
    }
}


// Start the animation.
animate();
function performPageTransition(url) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0,
        transition: 'opacity 5s ease',
        zIndex: 9999
    });
    document.body.appendChild(overlay);

    // Fade in the overlay
    requestAnimationFrame(() => {
        overlay.style.opacity = 1;

        // Wait for the fade-in to complete before starting fade-out
        setTimeout(() => {
            // Fade out the overlay
            overlay.style.opacity = 0;

            // Wait for the fade-out to complete before redirecting
            setTimeout(() => {
                window.location.href = url; // Redirect to the new page
            }, 1000); // This timeout matches the fade-out duration
        }, 1000); // Additional delay to ensure the overlay is fully visible before starting the fade-out
    });
}

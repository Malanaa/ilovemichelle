document.addEventListener("DOMContentLoaded", function() {
    const containerElement = document.getElementById("image-container");
    const textElement = document.getElementById("changeable-text");
    let currentIndex = 0;
    let isTyping = false; // Flag to indicate if typing is in progress
    const texts = ["", "1. cause you are Michelle", "2. you are the coolest girl ever", "3. i miss you when you're gone", "4. you have nice butt", "5. it feels like home when i'm with you", "6. you have really nice eyes", "7. you're so pretty ", "8. you care about me", "You are perfect"];

    function typeText(text, final = false) {
        let charIndex = 0;
        isTyping = true; // Typing starts
        textElement.textContent = ''; // Clear the text element
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                textElement.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                isTyping = false; // Typing ends
                if (final) {
                    containerElement.removeEventListener("click", handleClick); // Remove event listener if final text
                }
            }
        }, 100); // Speed of typing, adjust as necessary
    }

    function handleClick() {
        if (!isTyping) { // Proceed only if not currently typing
            currentIndex = (currentIndex + 1) % texts.length;
            const isFinalText = currentIndex === texts.length - 1;
            typeText(texts[currentIndex], isFinalText);
        }
    }

    containerElement.addEventListener("click", handleClick);
});



document.addEventListener('DOMContentLoaded', () => {
    // Create an overlay element
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = '1';
    overlay.style.zIndex = '9999';
    overlay.style.transition = 'opacity 5s ease'; // Match the duration to your fade-out effect on love.html

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Ensure the overlay is rendered by forcing reflow/repaint
    overlay.getBoundingClientRect();

    // Fade out the overlay to reveal the content
    setTimeout(() => {
        overlay.style.opacity = '0';

        // Remove the overlay from the DOM after the transition completes
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 6000); // This duration should match the transition duration
    }, 100); // A short delay before starting the fade-out, adjust as needed
});

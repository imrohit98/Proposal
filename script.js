function respond(answer) {
    sendResponse(answer);
    const buttons = document.getElementById('buttons');
    const response = document.getElementById('response');
    buttons.style.display = 'none';
    response.classList.remove('hidden');

    if (answer) {
        const confettiContainer = document.getElementById('confetti-container');
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
        }
        response.innerHTML = `
            <div class="response response-yes">
                <h2>Wonderful!</h2>
                <p>I'm so happy you said yes! Looking forward to our journey together.</p>
            </div>
        `;
    } else {
        const funnyResponses = [
            "Ouch! My heart just did a backflip and landed on its face. 💔🤸‍♂️",
            "I guess I'll have to eat all this chocolate by myself now. More for me! 🍫😋",
            "Time to update my relationship status to 'In a committed relationship with my pillow'. 😴💤",
            "Alright, back to practicing my pickup lines in the mirror! 😎🪞"
        ];
        const randomResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
        response.innerHTML = `
            <div class="response response-no">
                <h2>I understand</h2>
                <p>Thank you for your honesty. I respect your decision and value our friendship.</p>
                <p class="funny-response">${randomResponse}</p>
            </div>
        `;
    }

    setTimeout(() => {
        response.classList.add('shrink');
    }, 100);
}

function sendResponse(answer) {
    const formData = new FormData();
    formData.append('answer', answer ? 'Yes' : 'No');

    fetch('https://formspree.io/f/xkgwrbpn', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Response sent successfully');
        } else {
            console.error('Failed to send response');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

function cleanUpConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}

document.addEventListener('animationend', function(e) {
    if (e.target.classList.contains('confetti')) {
        e.target.remove();
    }
});
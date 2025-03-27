const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');

// Function to send a message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) {
        // Add subtle shake animation to input
        chatInput.classList.add('error');
        setTimeout(() => chatInput.classList.remove('error'), 500);
        return;
    }

    // Add user message to the chat
    addMessageToChat('user', message);
    chatInput.value = ''; // Clear input

    // Show typing indicator
    showTypingIndicator();

    // Send the message to the backend
    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Remove typing indicator
        hideTypingIndicator();

        // Add bot response to the chat
        const botMessage = `
            <div class="bot-content">
                <div><strong>Verse:</strong> ${data.verse}</div>
                <div><strong>Translation:</strong> ${data.translation}</div>
                <div><strong>Section/Chapter:</strong> ${data.section || data.chapter}</div>
                <div><strong>Explanation:</strong> ${data.explanation}</div>
                <div><strong>Story:</strong> ${data.story}</div>
            </div>
        `;
        addMessageToChat('bot', botMessage);

        // Show language options if ready for translation
        if (data.ready_for_translation) {
            showLanguageOptions(data.languages, data.translation, data.explanation, data.story);
        }
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('bot', `Error: ${error.message}`);
    }
}

// Function to add a message to the chat
function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-bubble">${message}</div>
            <div class="avatar user">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="avatar bot">
                <i class="fas fa-book"></i>
            </div>
            <div class="message-bubble">${message}</div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

// Function to hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to show language options
function showLanguageOptions(languages, text, explanation, story) {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('translation-options');
    optionsContainer.innerHTML = '<strong>Select a language for translation:</strong>';

    languages.forEach((lang) => {
        const button = document.createElement('button');
        button.classList.add('translate-button');
        button.textContent = `Translate to ${getLanguageName(lang)}`;
        button.dataset.language = lang;
        button.dataset.text = text;
        button.dataset.explanation = explanation;
        button.dataset.story = story;

        button.addEventListener('click', async (event) => {
            const language = event.target.dataset.language;
            const originalText = event.target.dataset.text;
            const originalExplanation = event.target.dataset.explanation;
            const originalStory = event.target.dataset.story;

            // Translate the text, explanation, and story
            const { translatedText, translatedExplanation, translatedStory } = await translateMessage(
                originalText,
                originalExplanation,
                originalStory,
                language
            );

            // Add the translated message to the chat
            addMessageToChat(
                'bot',
                `<strong>Translated (${getLanguageName(language)}):</strong>
                <div><strong>Translation:</strong> ${translatedText}</div>
                <div><strong>Explanation:</strong> ${translatedExplanation}</div>
                <div><strong>Story:</strong> ${translatedStory}</div>`
            );

            // Show language options again
            showLanguageOptions(languages, originalText, originalExplanation, originalStory);
        });

        optionsContainer.appendChild(button);
    });

    chatMessages.appendChild(optionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

// Function to translate a message
async function translateMessage(text, explanation, story, language) {
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, explanation, story, language }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            translatedText: data.translated_text,
            translatedExplanation: data.translated_explanation,
            translatedStory: data.translated_story,
        };
    } catch (error) {
        console.error("Error during translation:", error);
        return {
            translatedText: "Translation failed.",
            translatedExplanation: "Translation failed.",
            translatedStory: "Translation failed.",
        };
    }
}

// Function to get the language name from the language code
function getLanguageName(code) {
    const languageMap = {
        ta: "Tamil",
        hi: "Hindi",
        ml: "Malayalam",
        te: "Telugu",
        bn: "Bengali",
        gu: "Gujarati",
        kn: "Kannada",
        mr: "Marathi",
        pa: "Punjabi",
        ur: "Urdu",
    };
    return languageMap[code] || code;
}

// Function to clear chat history
async function clearHistory() {
    try {
        const response = await fetch('/clear_history', {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Clear the chat UI without showing a pop-up
        chatMessages.innerHTML = `
            <div class="message bot">
                <div class="avatar bot">
                    <i class="fas fa-book"></i>
                </div>
                <div class="message-bubble">
                    <div class="bot-content">
                        Welcome to the Sacred Text Chatbot! Ask me any question about sacred texts, and I'll provide verses, explanations, and stories to help you understand.
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error clearing history:", error);
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearHistory);
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
(function() {
  // Create chat widget container
  const chatWidget = document.createElement('div');
  chatWidget.id = 'chat-widget';
  chatWidget.style.position = 'fixed';
  chatWidget.style.bottom = '20px';
  chatWidget.style.right = '20px';
  chatWidget.style.border = '1px solid #ccc';
  chatWidget.style.padding = '10px';
  chatWidget.style.backgroundColor = 'white';
  chatWidget.style.maxWidth = '300px';
  chatWidget.style.zIndex = '1000';
  chatWidget.style.display = 'none'; // Initially hidden

  // Create messages container
  const messagesContainer = document.createElement('div');
  messagesContainer.id = 'chat-widget-messages';
  messagesContainer.style.maxHeight = '200px';
  messagesContainer.style.overflowY = 'auto';
  messagesContainer.style.marginBottom = '10px';
  chatWidget.appendChild(messagesContainer);

  // Create input and button
  const inputField = document.createElement('input');
  inputField.id = 'chat-widget-input';
  inputField.type = 'text';
  inputField.placeholder = 'Type a message...';
  inputField.style.width = '80%';

  const sendButton = document.createElement('button');
  sendButton.id = 'chat-widget-button';
  sendButton.textContent = 'Send';
  sendButton.style.width = '20%';

  chatWidget.appendChild(inputField);
  chatWidget.appendChild(sendButton);

  // Append widget to body
  document.body.appendChild(chatWidget);

  // Function to show the widget
  function showWidget() {
    chatWidget.style.display = 'block';
  }

  // Function to hide the widget
  function hideWidget() {
    chatWidget.style.display = 'none';
  }

  // Add event listener to show widget when needed
  document.addEventListener('DOMContentLoaded', function() {
    showWidget(); // Show the widget when the page loads

    sendButton.addEventListener('click', function() {
      const message = inputField.value.trim();
      if (message) {
        appendMessage(message, 'user');
        inputField.value = '';

        // Send the message to your server or handle it here
      }
    });

    inputField.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
  });

  // Function to append a message
  function appendMessage(message, sender) {
    if (messagesContainer) { // Check if messagesContainer is not null
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.style.textAlign = sender === 'user' ? 'right' : 'left';
      messagesContainer.appendChild(messageElement);
    } else {
      console.error('Messages container is not available');
    }
  }

  // Track user data
  async function trackUserData() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;

    const payload = {
      ip,
      visitedPage: window.location.href,
      userAgent: navigator.userAgent,
      companyId: new URLSearchParams(window.location.search).get('companyId'),
    };

    await fetch('https://your-vchat-api.com/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }

  trackUserData();
})();

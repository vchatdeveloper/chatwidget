(function() {
  // Function to log errors and important information
  function log(message) {
    console.log(message);
  }

  // Get the companyId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');

  if (!companyId) {
    console.error('No companyId found in the URL.');
    return;
  }

  log(`Company ID: ${companyId}`);

  // Create the chat container div
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-container';
  document.body.appendChild(chatContainer);

  // Add the CSS file
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = 'https://cdn.jsdelivr.net/gh/your-username/your-repo@latest/style.css';
  document.head.appendChild(linkElement);

  // Inject the HTML content
  const htmlContent = `
    <button class="chat-bot-btn" id="chat-bot-btn-id">
      <i class="fa fa-comments"></i> Chat Now
    </button>
    <div class="chat-bot-container" id="chat-bot-container">
      <div class="chat-ui-bot">
        <div class="chat-ui-bot-header">
          <h3>Chat Bot</h3>
          <i class="fa fa-times" id="close-chat"></i>
        </div>
        <div class="chat-ui-bot-body">
          <!-- Dynamic content based on companyId -->
        </div>
        <div class="chat-ui-bot-footer">
          <input type="text" id="user-input" placeholder="Type your message here...">
          <button id="send-btn"><i class="fa fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;

  chatContainer.innerHTML = htmlContent;

  // Add Font Awesome for icons
  const fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(fontAwesomeLink);

  // Add event listeners for chat bot functionality
  const chatBotContainer = document.getElementById('chat-bot-container');
  const chatBotBtn = document.getElementById('chat-bot-btn-id');
  const closeChat = document.getElementById('close-chat');
  const sendBtn = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');

  chatBotBtn.addEventListener('click', function() {
    chatBotContainer.style.display = 'flex';
    chatBotBtn.style.display = 'none'; // Hide the button when chat UI is open
    log('Chat UI opened');
  });

  closeChat.addEventListener('click', function() {
    chatBotContainer.style.display = 'none';
    chatBotBtn.style.display = 'flex'; // Show the button when chat UI is closed
    log('Chat UI closed');
  });

  sendBtn.addEventListener('click', function() {
    const message = userInput.value.trim();
    if (message) {
      appendMessage(message, 'user');
      userInput.value = '';
      log('Message sent: ' + message);
    }
  });

  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

  function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = 'message ' + sender;
    chatBotContainer.querySelector('.chat-ui-bot-body').appendChild(messageElement);
    log('Message appended: ' + message);
  }

  // Track user data
  async function trackUserData() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip;

      const payload = {
        ip,
        visitedPage: window.location.href,
        userAgent: navigator.userAgent,
        companyId: companyId,
      };

      await fetch('http://localhost:3001/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      log('User data tracked successfully');
    } catch (error) {
      console.error('Error tracking user data:', error.message);
    }
  }

  trackUserData();
})();

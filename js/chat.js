// Create and append required CSS
const chatStyles = document.createElement("style");
chatStyles.textContent = `
  /* WhatsApp Button Styles */
  .whatsapp-btn {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 999;
    background-color: #25d366;
    color: white;
    border-radius: 50px;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
  }

  .whatsapp-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background-color: #22bf5b;
  }

  .whatsapp-icon {
    font-size: 24px;
  }

  .whatsapp-text {
    font-size: 14px;
    font-weight: 500;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
    70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
  }

  /* Chatbot Styles */
  .chatbot-widget {
    position: fixed;
    bottom: 100px;
    right: 25px;
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
    z-index: 998;
    overflow: hidden;
    display: none;
  }

  .chatbot-header {
    background: linear-gradient(90deg, #2a9d8f, #264653);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chatbot-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 20px;
  }

  .chatbot-messages {
    height: 300px;
    overflow-y: auto;
    padding: 15px;
  }

  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
  }

  .bot-message {
    background: #f0f0f0;
    margin-right: auto;
  }

  .user-message {
    background: #2a9d8f;
    color: white;
    margin-left: auto;
  }

  .chatbot-input {
    display: flex;
    padding: 15px;
    border-top: 1px solid #eee;
  }

  .chatbot-input input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
  }

  .chatbot-input button {
    background: #2a9d8f;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
  }

  .chatbot-trigger {
    position: fixed;
    right: 25px;
    bottom: 100px;
    background: linear-gradient(90deg, #2a9d8f, #264653);
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 997;
  }

  @media (max-width: 768px) {
    .whatsapp-text {
      display: none;
    }
    
    .whatsapp-btn {
      padding: 12px;
    }
  }
`;

// Create and append chat elements
function initializeChat() {
  // Append styles
  document.head.appendChild(chatStyles);

  // Add WhatsApp button
  const whatsappBtn = document.createElement("a");
  whatsappBtn.href = "https://wa.me/94767666390"; // Replace with your number
  whatsappBtn.className = "whatsapp-btn";
  whatsappBtn.target = "_blank";
  whatsappBtn.innerHTML = `
    <i class="fab fa-whatsapp whatsapp-icon"></i>
    <span class="whatsapp-text">Chat with us</span>
  `;

  // Add Chatbot elements
  const chatbotHTML = `
    <button class="chatbot-trigger">
      <i class="fas fa-comments"></i>
    </button>

    <div class="chatbot-widget">
      <div class="chatbot-header">
        <h3>Chat with us</h3>
        <button class="chatbot-close">&times;</button>
      </div>
      <div class="chatbot-messages"></div>
      <div class="chatbot-input">
        <input type="text" placeholder="Type your message...">
        <button><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;

  // Create container for chat elements
  const chatContainer = document.createElement("div");
  chatContainer.innerHTML = chatbotHTML;

  // Append elements to body
  document.body.appendChild(whatsappBtn);
  document.body.appendChild(chatContainer);

  // Initialize chatbot functionality
  initializeChatbot();
}

// Chatbot functionality
function initializeChatbot() {
  const chatbot = {
    trigger: document.querySelector(".chatbot-trigger"),
    widget: document.querySelector(".chatbot-widget"),
    messagesContainer: document.querySelector(".chatbot-messages"),
    input: document.querySelector(".chatbot-input input"),
    sendButton: document.querySelector(".chatbot-input button"),
    closeButton: document.querySelector(".chatbot-close"),

    patterns: [
      {
        keywords: ["hello", "hi", "hey", "start"],
        responses: [
          "Hello! Welcome to JAK Travels! How may I assist you in planning your Sri Lankan adventure?",
          "Hi there! I'd be happy to help you explore Sri Lanka. What kind of experience are you looking for?",
        ],
      },
      {
        keywords: ["packages", "tours", "tour package", "options"],
        responses: [
          "We offer 5 exciting packages:\n1. Classic Adventure (12 days)\n2. Wildlife Tour (11 days)\n3. Wildlife & Nature Tour (10 days)\n4. Camping & Cycling Adventure\n5. East Coast Tour\n\nWe also create custom packages! Which interests you?",
          "Let me tell you about our packages:\n- Classic Adventure: Cultural sites & scenic beauty\n- Wildlife Tour: Safari & animal encounters\n- Wildlife & Nature: Best of Sri Lanka's wilderness\n- Camping & Cycling: Active adventure\n- East Coast Tour: Beaches & culture\n\nWe can also customize a tour for you! Which would you like to know more about?",
        ],
      },
      {
        keywords: ["classic", "cultural"],
        responses: [
          "Our Classic Adventure is a 12-day journey covering iconic sites like Sigiriya, Kandy, Ella, and Galle. It includes luxury accommodations, cultural experiences, and scenic train rides. Would you like me to get our travel consultant to provide detailed pricing?",
          "The Classic package is perfect for first-time visitors! You'll experience ancient cities, tea plantations, train journeys, and colonial towns over 12 memorable days. Shall I have our team send you the full itinerary?",
        ],
      },
      {
        keywords: ["wildlife", "safari", "animals"],
        responses: [
          "Our Wildlife Tour is an 11-day adventure featuring safaris in Yala National Park, where you can spot leopards, elephants, and exotic birds. Would you like to know more about the wildlife experiences we offer?",
          "We have two wildlife packages:\n1. Wildlife Tour: Focus on safaris and animal encounters\n2. Wildlife & Nature: Combines safaris with rainforest experiences\n\nWhich interests you more?",
        ],
      },
      {
        keywords: ["camping", "cycling", "bike", "adventure"],
        responses: [
          "Our Camping & Cycling Adventure combines outdoor experiences with Sri Lanka's natural beauty. It includes guided cycling tours and comfortable camping experiences. Would you like to know more about the activities included?",
          "The Camping & Cycling package offers a unique way to experience Sri Lanka, with scenic rides and nights under the stars. Shall I have our adventure specialist contact you with more details?",
        ],
      },
      {
        keywords: ["east coast", "beach"],
        responses: [
          "Our East Coast Tour showcases Sri Lanka's beautiful beaches, water sports, and cultural sites along the eastern shoreline. Would you like to know more about the coastal experiences we offer?",
          "The East Coast package is perfect for beach lovers and water sports enthusiasts. It includes stays in beachfront properties and various water activities. Would you like to see the full itinerary?",
        ],
      },
      {
        keywords: ["custom", "customized", "tailor", "personalized"],
        responses: [
          "We love creating custom tours! To help us design your perfect trip, could you tell me:\n1. How many days you'd like to travel?\n2. What interests you most about Sri Lanka?\n3. Your preferred travel style (luxury, moderate, budget)?",
          "We'll be happy to create a custom package for you! To get started, could you share:\n- Your preferred duration\n- Main interests (culture/wildlife/adventure/beaches)\n- Type of accommodations you prefer?",
        ],
      },
      {
        keywords: ["price", "cost", "fee", "pricing", "rates"],
        responses: [
          "Our package prices vary based on the season, number of travelers, and accommodation choices. Could you share your contact number? Our travel consultant will provide detailed pricing options.",
          "To provide accurate pricing, we'll need a few details. Would you mind sharing your contact number and preferred travel dates? Our team will send you a detailed quote.",
        ],
      },
      {
        keywords: ["contact", "phone", "number", "reach"],
        responses: [
          "I'll have our travel consultant contact you! Please share your phone number, and they'll reach out with all the information you need.",
          "To help you better, could you provide your contact number? Our travel specialist will get in touch with detailed information and answers to all your questions.",
        ],
      },
      {
        keywords: ["duration", "days", "long", "time"],
        responses: [
          "Our packages range from 10-14 days, but we can customize the duration to fit your schedule. How many days are you planning to spend in Sri Lanka?",
          "While our standard packages are 10-14 days, we can adjust the duration to match your preferences. How long would you like to explore Sri Lanka?",
        ],
      },
      {
        keywords: ["hotel", "stay", "accommodation", "lodging"],
        responses: [
          "We offer various accommodation options from luxury hotels to boutique properties and eco-lodges. What's your preferred style of accommodation?",
          "Our packages include carefully selected hotels ranging from 5-star luxury to charming boutique properties. Would you like to know more about our accommodation options?",
        ],
      },
      {
        keywords: ["transport", "travel", "vehicle"],
        responses: [
          "All our tours include private transportation with an experienced driver-guide in comfortable, air-conditioned vehicles. Would you like more details about our transport arrangements?",
          "We provide private air-conditioned vehicles with professional drivers for all tours. For certain routes, we also include scenic train journeys. Would you like to know more?",
        ],
      },
      {
        keywords: ["food", "meal", "dining"],
        responses: [
          "Our packages typically include breakfast and dinner, featuring both Sri Lankan and international cuisine. We can accommodate dietary requirements - would you like to know more about our meal arrangements?",
          "Most packages include half-board meals (breakfast and dinner). You'll experience authentic Sri Lankan cuisine and international options. Do you have any specific dietary preferences?",
        ],
      },
      {
        keywords: ["weather", "climate", "season", "when"],
        responses: [
          "The best time to visit depends on your chosen destinations. Generally, December to April is ideal for most tours. Would you like to know about weather conditions for specific months?",
          "Sri Lanka has varying weather patterns in different regions. When are you planning to travel? I can help suggest the best package for that season.",
        ],
      },
      {
        keywords: ["include", "included", "cover", "inclusion"],
        responses: [
          "Our packages typically include:\n- Accommodation\n- Half-board meals\n- Private transportation\n- Professional guide\n- Entrance fees\n- Activities mentioned in itinerary\nWould you like specific details for any package?",
          "All tours include accommodation, meals, transport, guide services, and activity fees. Would you like to know about inclusions for a specific package?",
        ],
      },
      {
        keywords: ["safe", "safety", "security"],
        responses: [
          "Sri Lanka is a very safe destination for tourists. We prioritize your safety with reliable drivers, quality accommodations, and 24/7 support. Would you like to know more about our safety measures?",
          "We maintain high safety standards throughout our tours with experienced guides, trusted accommodations, and constant support. Would you like more details about traveling safely in Sri Lanka?",
        ],
      },
    ],

    defaultResponses: [
      "I'd be happy to help you plan your Sri Lankan adventure! Could you tell me what kind of experience you're looking for?",
      "To better assist you, could you share what aspects of Sri Lanka interest you most? We have packages covering wildlife, culture, adventure, and more!",
      "I want to ensure you get the best advice. Would you like to speak with our travel consultant who can provide more detailed information?",
      "To help you better, could you share what type of travel experience you're seeking? We can then recommend the perfect package for you!",
    ],
    init() {
      this.trigger.addEventListener("click", () => this.toggleWidget());
      this.closeButton.addEventListener("click", () => this.toggleWidget());
      this.sendButton.addEventListener("click", () => this.sendMessage());
      this.input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.sendMessage();
      });

      setTimeout(() => {
        this.addMessage(
          "Hello! How can I help you plan your Sri Lankan adventure?",
          "bot"
        );
      }, 500);
    },

    toggleWidget() {
      this.widget.style.display =
        this.widget.style.display === "none" ? "block" : "none";
    },

    addMessage(text, sender) {
      const message = document.createElement("div");
      message.classList.add("message", `${sender}-message`);
      message.textContent = text;
      this.messagesContainer.appendChild(message);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    getResponse(input) {
      const lowercaseInput = input.toLowerCase();

      for (const pattern of this.patterns) {
        if (
          pattern.keywords.some((keyword) => lowercaseInput.includes(keyword))
        ) {
          return pattern.responses[
            Math.floor(Math.random() * pattern.responses.length)
          ];
        }
      }

      return this.defaultResponses[
        Math.floor(Math.random() * this.defaultResponses.length)
      ];
    },

    sendMessage() {
      const text = this.input.value.trim();
      if (!text) return;

      this.addMessage(text, "user");
      this.input.value = "";

      setTimeout(() => {
        const response = this.getResponse(text);
        this.addMessage(response, "bot");
      }, 500);
    },
  };

  chatbot.init();
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeChat);

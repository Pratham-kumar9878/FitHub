let select = document.querySelector(".select-heading");
let arrow = document.querySelector(".select-heading img");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");
let selectText = document.querySelector(".select-heading span");

select.addEventListener("click", () => {
  options.classList.toggle("active-options");
  arrow.classList.toggle("rotate");
});

option.forEach((item) => {
  item.addEventListener("click", () => {
    selectText.innerText = item.innerText;
    options.classList.remove("active-options");
  });
});

let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let chatcontainer = document.querySelector(".chat-container");
let h1 = document.querySelector(".h1");
let chatimg = document.querySelector("#chatbotimg");
let chatbox = document.querySelector(".chat-box");

let userMessage = "";
chatimg.addEventListener("click", () => {
  chatbox.classList.toggle("active-chat-box"); 
  chatimg.src = chatbox.classList.contains("active-chat-box") ? "cross.svg" : "ai.svg";
});

async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text");
  aiChatBox.querySelector(".loading").style.display = "block";
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAPo79fgbRtEbL1ovwrZ6QMcJ0LwX1RlOI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${userMessage} in 10 words`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    if (apiResponse) {
      textElement.innerText = apiResponse;
      
      // Check if the response contains workout information
      if (apiResponse.toLowerCase().includes("workout") || 
          apiResponse.toLowerCase().includes("exercise") ||
          apiResponse.toLowerCase().includes("back") ||
          apiResponse.toLowerCase().includes("chest") ||
          apiResponse.toLowerCase().includes("shoulder") ||
          apiResponse.toLowerCase().includes("leg")) {
        
        // Hide the chatbox after 3 seconds
        setTimeout(() => {
          chatbox.classList.remove("active-chat-box");
          chatimg.src = "ai.svg";
        }, 3000);
      }
    } else {
      textElement.innerText = "Sorry, I couldn't understand that.";
    }
  } catch (error) {
    console.error(error);
    textElement.innerText = "Error: Unable to fetch response. Please try again.";
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}
function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

function showLoading() {
  const html = '<p class="text"></p><img src="load.gif" class="loading" width="50px">';
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatcontainer.appendChild(aiChatBox);
  generateApiResponse(aiChatBox);
}

chatbtn.addEventListener("click", () => {
  h1.style.display = "none";
  userMessage = prompt.value.trim(); 
  if (userMessage === "") {
    return;
  }

  const html = '<p class="text"></p>';
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatcontainer.appendChild(userChatBox);
  prompt.value = "";

  showLoading();
});

let ai = document.querySelector(".virtual-assistant img");
let speakpage = document.querySelector(".speak-page");
let content = document.querySelector(".speak-page h1");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
  let recognition = new speechRecognition();
  recognition.onresult = (event) => {
    speakpage.style.display = "none";
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
  };

  ai.addEventListener("click", () => {
    speakpage.style.display = "flex";
    recognition.start();
  });
} else {
  console.error("Speech Recognition API not supported in this browser.");
}

function takeCommand(message) {
  if (message.includes("open") && message.includes("chat")) {
    speak("Okay sir");
    chatbox.classList.add("active-chat-box");
    chatimg.src = "cross.svg";
  } else if (message.includes("close") && message.includes("chat")) {
    speak("Okay sir");
    chatbox.classList.remove("active-chat-box");
    chatimg.src = "ai.svg";
  } 
  else if(message.includes("hello") && message.includes("Hello")){
    speak("Hello sir");
  }
  else if(message.includes("How are you")){
    speak("fine sir,what about you");
  }
  else if (message.includes("back")) {
    speak("Okay sir");
    window.open("back.html")
  }
  else if (message.includes("all workout")) {
    speak("Okay sir");
    window.open("allworkout.html")
  }
  else if (message.includes("chest")) {
    speak("Okay sir");
    window.open("chest.html")
  }
  else if (message.includes("bicep") || message.includes("biceps") || message.includes("triceps") || message.includes("tricep")) {
    speak("Okay sir");
    window.open("biceptricep.html")
  }
  else if (message.includes("shoulder") || message.includes("shoulders")) {
    speak("Okay sir");
    window.open("shoulders.html")
  }
  else if (message.includes("leg")) {
    speak("Okay sir");
    window.open("leg.html")
  }
  else if (message.includes("home")) {
    speak("Okay sir");
    window.open("Chatbot.html")
  }
}

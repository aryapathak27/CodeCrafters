document.addEventListener("DOMContentLoaded", function () {
    console.log("Cyber Law AI Assistant is ready!");
});

// Signup Function
function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        document.getElementById("message").innerText = "Signup successful! Please login.";
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    } else {
        document.getElementById("message").innerText = "Please fill all fields!";
    }
}

// Login Function
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        document.getElementById("message").innerText = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "categories.html"; // Redirect to categories page
        }, 2000);
    } else {
        document.getElementById("message").innerText = "Invalid username or password!";
    }
}

// Select Category Function
function selectCategory(category) {
    localStorage.setItem("selectedCategory", category);
    alert("You selected: " + category);
    window.location.href = "chat.html"; // Redirect to chat page
}

// Logout Function
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "index.html"; // Redirect to login page
}

// Display Selected Category
document.addEventListener("DOMContentLoaded", function () {
    const selectedCategory = localStorage.getItem("selectedCategory");
    if (selectedCategory) {
        document.getElementById("selected-category").textContent = selectedCategory;
    }
});

// *Chat Function using Gemini API*
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += <p><strong>You:</strong> ${userInput}</p>;
    document.getElementById("user-input").value = ""; // Clear input field

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyC1WjoolMZb69EN0qBIoN7LK-rzy95Skzw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: Category: ${localStorage.getItem("selectedCategory")}, Question: ${userInput} }]
                }]
            })
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            const botReply = data.candidates[0].content.parts[0].text;
            chatBox.innerHTML += <p><strong>AI:</strong> ${botReply}</p>;
        } else {
            chatBox.innerHTML += <p><strong>AI:</strong> Sorry, I couldn't process that.</p>;
        }

        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += <p><strong>AI:</strong> Error connecting to AI.</p>;
    }
}

const nameElement = document.querySelector(".contact-details p:first-child");
const phoneElement = document.querySelector(".contact-details p:last-child");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

async function getContactInfo() {
  try {
    const response = await fetch(
      `https://sms-sender-backend.onrender.com/api/contacts/getDetails?userId=${userId}`
    );
    const contact = await response.json();
    nameElement.textContent = `Name: ${contact.details.firstName} ${contact.details.lastName}`;
    phoneElement.textContent = `Phone: ${contact.details.mobileNumber}`;
    return {phoneNumber:contact.details.mobileNumber,fullName:` ${contact.details.firstName} ${contact.details.lastName} `}
  } catch (error) {
    console.error("Error fetching contact information:", error);
  }
}

 getContactInfo();


// funtion to insert text and otp inside popup
let otp = Math.floor(100000 + Math.random() * 900000);
function insertText() {
  const message = `Hi, your OTP is ${otp}`;
  const input = document.getElementById("myInput");
  input.value = message;
}

// This will open popup form to send otp
const sendMessageBtn = document.querySelector(".send-message-btn");
const popupForm = document.querySelector(".popup-form");
const otpInput = document.querySelector("#otp");
const submitBtn = document.querySelector("#submit");

sendMessageBtn.addEventListener("click", function () {
  popupForm.style.display = "block";
});

//call send otp api 
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const contact = await getContactInfo();
  const response = await fetch("https://sms-sender-backend.onrender.com/api/contacts/sendOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobileNumber: contact.phoneNumber, userId, OTP:otp }),
  });


  if (response.ok) {
    alert("Message sent successfully!");
    popupForm.style.display = "none";
    location.reload();
  } else {
    // TODO: show error message
    alert("Failed to send message. Please try again.");
    location.reload();
  }
});


// close button for popup box
const closeButton = document.querySelector(".close-btn");
closeButton.addEventListener("click", function () {
  // Hide the popup form
  popupForm.style.display = "none";
});



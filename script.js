async function getContacts() {
  try {
    const response = await fetch('https://sms-sender-backend.onrender.com/api/contacts/list');
    if (response.ok) {
      const data = await response.json();
      const tableBody = document.querySelector('#contacts-table tbody');
      data.contacts.forEach(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`;
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        const anchor = document.createElement('a');
        anchor.textContent = fullName;
        anchor.href = `/contactInfo.html?userId=${contact._id}`;
        cell.appendChild(anchor);
        row.appendChild(cell);
        tableBody.appendChild(row);
      });
    } else {
      console.error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

getContacts();

async function getListMessages() {
  try {
    const response = await fetch('https://sms-sender-backend.onrender.com/api/contacts/listMessages');
    if (response.ok) {
      const data = await response.json();
      const tableBody = document.querySelector('#listMessage-table tbody');
      data.data.forEach(message => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent =`${message.name} ${message.lastName}`;
        row.appendChild(nameCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = message.time;
        row.appendChild(timeCell);

        const otpCell = document.createElement('td');
        otpCell.textContent = message.OTP;
        row.appendChild(otpCell);
        tableBody.appendChild(row);
      });
    } else {
      console.error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

getListMessages();


// Get the button that opens the popup
let btn = document.getElementById("add-contacts");

// Get the popup
let popup = document.querySelector(".popup-container");

// Get the close button
let close = document.querySelector(".close");

// When the user clicks on the button, open the popup
btn.addEventListener("click", function() {
	popup.style.display = "block";
});

// When the user clicks on <span> (x), close the popup
close.addEventListener("click", function() {
	popup.style.display = "none";
});


// When the user clicks anywhere outside of the popup, close it
window.addEventListener("click", function(event) {
	if (event.target == popup) {
		popup.style.display = "none";
	}
});

// Get the form and add a submit event listener
// let form = document.getElementById("contact-form");
let form = document.getElementById("contact-form");
let fname = document.getElementById('fname').value
let lname = document.getElementById('lname').nodeValue
let contact = document.getElementById('contact').value

form.addEventListener("submit", async function (event) {
  event.preventDefault();

   // Get the form data
  let formData = new FormData(form);


  const response = await fetch("https://sms-sender-backend.onrender.com/api/contacts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName: formData.get("fname"), lastName:formData.get("lname"), mobileNumber:formData.get("contact") }),
  });


  if (response.ok) {
    alert("Contact Added successfully!");
    form.style.display = "none";
    location.reload();
  } else {
    // TODO: show error message
    alert("Failed to add contact. Please try again.");
  }
});

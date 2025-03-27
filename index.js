const API_URL = "https://reqres.in/api/users";

function handleButtonClick(event) {
    const action = event.target.getAttribute("data-action");
    const id = document.getElementById("id").value;
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("cred").value;

    if (action === "GET") getUsers();
    else if (action === "POST") createUser(firstName, lastName, email);
    else if (action === "PUT") updateUser(id, firstName, lastName, email);
    else if (action === "PATCH") patchUser(id, firstName, lastName, email);
    else if (action === "DELETE") deleteUser(id);
}

function getUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => displayUsers(data.data))
        .catch(err => console.error("Error fetching users:", err));
}

function displayUsers(users) {
    const container = document.getElementById("user-list");
    container.innerHTML = "";
    container.classList.add("horizontal-scroll");

    users.forEach(user => {
        addUserToUI(user);
    });
}

function createUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
        alert("Please enter all required fields.");
        return;
    }

    const fileInput = document.getElementById("avatar");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image.");
        return;
    }


    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const imageBase64 = reader.result;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email })
        })
        .then(res => res.json())
        .then(data => {

            data.avatar = imageBase64;
            addUserToUI(data);
        })
        .catch(err => console.error("Error creating user:", err));
    };
}

function addUserToUI(user) {
    const container = document.getElementById("user-list");

    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");
    userDiv.setAttribute("data-id", user.id);
    userDiv.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>First Name:</strong> <span class="first-name">${user.first_name}</span></p>
        <p><strong>Last Name:</strong> <span class="last-name">${user.last_name}</span></p>
        <p><strong>Email:</strong> <span class="email">${user.email}</span></p>
        <img src="${user.avatar}" alt="User Avatar">
    `;

    container.appendChild(userDiv);
}

function updateUser(id, firstName, lastName, email) {
    if (!id) {
        alert("Please enter a valid user ID to update.");
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email })
    })
    .then(res => res.json())
    .then(data => {
        alert(`User Updated: ${JSON.stringify(data)}`);
        updateUserInUI(id, data);
    })
    .catch(err => console.error("Error updating user:", err));
}


// PATCH
function patchUser(id, firstName, lastName, email) {
    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email })
    })
    .then(res => res.json())
    .then(data => updateUserInUI(id, data))
    .catch(err => console.error("Error patching user:", err));
}


// DELETE
function deleteUser(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => document.querySelector(`[data-id="${id}"]`)?.remove())
        .catch(err => console.error("Error deleting user:", err));
}

function updateUserInUI(id, updatedData) {
    document.querySelectorAll(".user-card").forEach(card => {
        if (card.getAttribute("data-id") === id) {
            card.querySelector(".first-name").textContent = updatedData.first_name || "N/A";
            card.querySelector(".last-name").textContent = updatedData.last_name || "N/A";
            card.querySelector(".email").textContent = updatedData.email || "N/A";
        }
    });
}

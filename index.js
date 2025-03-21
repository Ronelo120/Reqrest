let info = {
    avatar: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
};

let query = {
    method: undefined,
    headers: {
        "Content-Type": "application/json"
    }
};

let url = 'https://reqres.in/api/users';

function display(users) {
    let list = document.getElementById("user-list");
    users.forEach(user => {
        let textContent = `
        <img src=${user.avatar} />
        ${user.firstname} ${user.lastname} - ${user.email}
        `;
        list.innerHTML += textContent;
    });
}

async function buttonClick(button) {
    let response, data, id;
    let fileInput = document.getElementById("img");

    info.firstname = document.getElementById("fname").value || undefined;
    info.lastname = document.getElementById("lname").value || undefined;
    info.email = document.getElementById("cred").value || undefined;

    // Handle file input (avatar)
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = async function () {
            info.avatar = reader.result; // Base64 string of the image

            await handleRequest(button);
        };
        reader.readAsDataURL(file); // Convert file to base64
    } else {
        info.avatar = undefined;
        await handleRequest(button);
    }
}

async function handleRequest(button) {
    let response, data, id;

    switch (button.innerText) {
        case "GET":
            response = await fetch(url);
            data = await response.json();
            display(data.data); // Assuming the API returns a 'data' property with users
            console.log(data);
            break;

        case "POST":
            if (!info.firstname || !info.lastname || !info.email) {
                alert("Please fill in all fields before submitting.");
                return;
            }
            query.method = "POST";
            query.body = JSON.stringify(info);
            try {
                response = await fetch(url, query);
                data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error in POST request:", error);
            }
            break;

        case "PUT":
            id = document.getElementById("id").value;
            if (!id) {
                alert("ID is required for PUT");
                return;
            }

            if (!info.firstname || !info.lastname || !info.email) {
                alert("Please fill in all fields before updating.");
                return;
            }
            query.method = "PUT";
            query.body = JSON.stringify(info);
            try {
                response = await fetch(`${url}/${id}`, query);
                data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error in PUT request:", error);
            }
            break;

        case "PATCH":
            id = document.getElementById("id").value;
            if (!id) {
                alert("ID is required for PATCH");
                return;
            }

            if (!info.firstname || !info.lastname || !info.email) {
                alert("Please fill in all fields before updating.");
                return;
            }
            query.method = "PATCH";
            query.body = JSON.stringify(info);
            try {
                response = await fetch(`${url}/${id}`, query);
                data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error in PATCH request:", error);
            }
            break;

        case "DELETE":
            id = document.getElementById("id").value;
            if (!id) {
                alert("ID is required for DELETE");
                return;
            }
            query.method = "DELETE";
            delete query.body;
            try {
                response = await fetch(`${url}/${id}`, query);
                if (response.ok) {
                    console.log("Deleted successfully");
                } else {
                    console.error("Failed to delete");
                }
            } catch (error) {
                console.error("Error in DELETE request:", error);
            }
            break;

        default:
            alert("Invalid action");
    }
}

let info = {
    avatar: undefined,
    first_name: undefined,
    last_name: undefined,
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
    list.innerHTML = '';

    users.forEach(user => {
        let textContent = `
        <div style="margin: 10px 0; display: flex; align-items: center;">
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" />
            <div>
                <strong>${user.first_name} ${user.last_name}</strong> - ${user.email}
            </div>
        </div>
        `;
        list.innerHTML += textContent;
    });
}

async function buttonClick(button) {
    let response, data, id;
    let fileInput = document.getElementById("img");

    info.first_name = document.getElementById("fname").value || undefined;
    info.last_name = document.getElementById("lname").value || undefined;
    info.email = document.getElementById("cred").value || undefined;

    // Handle file input (avatar)
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = async function () {
            info.avatar = reader.result; 
            await handleRequest(button);
        };
        reader.readAsDataURL(file); 
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
            display(data.data); 
            break;

        case "POST":
            if (!info.first_name || !info.last_name || !info.email) {
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

            if (!info.first_name || !info.last_name || !info.email) {
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

            if (!info.first_name || !info.last_name || !info.email) {
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

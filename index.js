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

function display(users){
    let list = document.getElementById("user-list");
    users.forEach(user => {
        let textContent = `
        <img src=${user.avatar}
        ${user.firstname} ${user.lastname} - {user.email}
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

    if (fileInput && fileInput.type !== "hidden") {
        info.avatar = fileInput.files.length > 0 ? fileInput.files[0].name : undefined;
    } else {
        info.avatar = undefined;
    }

    switch (button.innerText) {
        case "GET":
            response = await fetch(url);
            data = await response.json();
            console.log(data);
            break;

        case "POST":

            if (!info.firstname || !info.lastname || !info.email) {
                alert("Please fill in all fields before submitting.");
                return;
            }
            query.method = "POST";
            query.body = JSON.stringify(info);
            response = await fetch(url, query);
            data = await response.json();
            console.log(data);
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
            response = await fetch(`${url}/${id}`, query);
            data = await response.json();
            console.log(data);
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
            response = await fetch(`${url}/${id}`, query);
            data = await response.json();
            console.log(data);
            break;

        case "DELETE":
            id = document.getElementById("id").value;
            if (!id) {
                alert("ID is required for DELETE");
                return;
            }
            query.method = "DELETE";
            delete query.body;
            response = await fetch(`${url}/${id}`, query);
            console.log("Deleted successfully");
            break;

        default:
            alert("Invalid action");
    }
}

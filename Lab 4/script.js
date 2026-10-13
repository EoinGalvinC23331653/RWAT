
let form = document.getElementById("registrationForm");
let dialog = document.getElementById("registrationDialog");
let confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let password = document.getElementById("password").value;

    let passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#%&*_=+\-$^]).{8,12}$/;

    if (!passwordPattern.test(password)) {
        alert("Password must be 8-12 characters and include uppercase, lowercase, number and special character.");
        return;
    }

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let dob = document.getElementById("dob").value;

    let purposes = [];
    document.querySelectorAll('input[name="purpose"]:checked')
        .forEach(function(checkbox) {
            purposes.push(checkbox.value);
        });

    let boards = [];
    document.querySelectorAll("#boards option:checked")
        .forEach(function(option) {
            boards.push(option.value);
        });

    let volunteer = document.querySelector(
        'input[name="volunteer"]:checked'
    ).value;

    // Close the registration dialog
    dialog.close();

    // Create confirmation message
    let heading = document.createElement("h2");
    heading.textContent = "Registration Successful!";

    confirmation.appendChild(heading);

    let details = [
        ["Username", username],
        ["Email", email],
        ["Date of Birth", dob || "Not provided"],
        ["Purpose", purposes.join(", ") || "None selected"],
        ["Boards of Interest", boards.join(", ") || "None selected"],
        ["Volunteering", volunteer]
    ];

    details.forEach(function(detail) {
        let paragraph = document.createElement("p");
        paragraph.textContent = detail[0] + ": " + detail[1];
        confirmation.appendChild(paragraph);
    });

});

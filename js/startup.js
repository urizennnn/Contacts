'use strict'
// Get references to the contact select element and the contact container
const contactSelect = document.querySelector('#contact');
const contactDiv = document.querySelector('.contact');

/**
 * Event listener for when the contact selection changes.
 * Modifies the contact form based on the selected option.
 */
contactSelect.addEventListener('change', () => {
    // Get the selected value from the contact select element
    const contactVal = contactSelect.value;

    // Clear the contents of the contact container
    contactDiv.innerHTML = '';

    // Check the selected value and update the contact form accordingly
    if (contactVal === 'phone') {
        // Create the HTML for the phone contact form
        const html = `
            <label for="name">Name:</label>
            <input type="text" class="name" placeholder="Enter name" required>
            <label for="number">Phone Number:</label>
            <input type="number" class="num number" name="iosPhoneNumber" pattern="^[+]?[0-9]*$" placeholder="Enter phone number" required>
            <ul class="keypad">
                <li class="phone">1</li>
                <li class="phone">2</li>
                <li class="phone">3</li>
                <li class="phone">4</li>
                <li class="phone">5</li>
                <li class="phone">6</li>
                <li class="phone">7</li>
                <li class="phone">8</li>
                <li class="phone">9</li>
                <li class="phone">0</li>
            </ul>
            <button type="submit" class="submit" onclick="submit(this)">Submit</button>
        `;

        // Insert the HTML into the contact container
        contactDiv.insertAdjacentHTML('afterbegin', html);

        // Add event listeners to the phone keypad buttons
        const phoneButtons = document.querySelectorAll('.phone');
        phoneButtons.forEach(button => {
            button.addEventListener('click', () => {
                const num = document.querySelector('.num');
                num.value += button.textContent;
            });
        });
    }

    if (contactVal === 'form') {
        // Create the HTML for the form contact form
        const html = `
            <label for="name">Name:</label>
            <input type="text" class="name" placeholder="Enter name" required>
            <label for="number">Phone Number:</label>
            <input type="tel" class="number" name="iosPhoneNumber" pattern="^[+]?[0-9]*$" placeholder="Enter phone number" required>
            <button type="submit" class="submit" onclick="submit(this)">Submit</button>
        `;

        // Insert the HTML into the contact container
        contactDiv.insertAdjacentHTML('afterbegin', html);
    }
});


/**
 * Handles the submission of the contact form.
 * Validates form inputs, adds contact to storage, and redirects if successful.
 */
function submit() {
    // Get references to the input elements for name and number
    const num = document.querySelector('.number');
    const user = document.querySelector('.name');

    // Get the values of the user's name and phone number
    const userValue = user.value;
    const numValue = num.value;

    // Check if the user's name is not provided
    if (!userValue) {
        // Add a click event listener to all buttons to prevent default form submission
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Please fill in the form');
            });
        });
    } else {
        // If the user's name is provided, attempt to add the contact to storage
        if (addContactToStorage(userValue, numValue)) {
            // Redirect to the view.html page if the contact is added successfully
            window.location.href = 'view.html';
        } else {
            // Log an error if an issue occurs while adding the contact
            console.error("An Error Occurred...");
        }
    }
}

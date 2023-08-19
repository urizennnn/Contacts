'use strict';

// const contacts = [
//     { name: 'John Doe', number: '123456789' },
//     { name: 'Alicia Keys', number: '987654321' },
//     { name: 'Brad Pitt', number: '555555555' },
//     { name: 'Emma Watson', number: '123123123' },
//     { name: 'Chris Hemsworth', number: '111222333' },
//     { name: 'Taylor Swift', number: '444555666' },
//     { name: 'Angelina Jolie', number: '777888999' },
//     { name: 'Leonardo DiCaprio', number: '555444333' },
//     { name: 'Selena Gomez', number: '222111000' },
//     { name: 'Justin Bieber', number: '999888777' },
//     { name: 'Jennifer Lawrence', number: '666555444' },
//     { name: 'Tom Hanks', number: '333222111' },
//     { name: 'Natalie Portman', number: '777777777' },
//     { name: 'Ryan Reynolds', number: '555555555' },
//     { name: 'Mila Kunis', number: '222222222' },
//     { name: 'Robert Downey Jr.', number: '999999999' },
//     { name: 'Scarlett Johansson', number: '444444444' },
//     { name: 'Will Smith', number: '111111111' },
//     { name: 'Katy Perry', number: '666666666' },
//     { name: 'Johnny Depp', number: '333333333' }
//     // Add more contacts here
// ];
// if (typeof localStorage !== 'undefined') {
//     const storedName = localStorage.getItem('Name');
//     const storedNumber = localStorage.getItem('Number');

//     if (storedName && storedNumber) {
//         contacts.push({ name: storedName, number: storedNumber });
//     }
// }

// contacts.sort((a, b) => a.name.localeCompare(b.name, "en", { ignorePunctuation: true }));
// localStorage.setItem("Contacts", contacts)

/**
 * Event listener for when the DOM content is fully loaded.
 * Populates the contact list based on the 'contacts' array.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the container for displaying contacts
    const showContact = document.querySelector('.contacts');

    // Loop through each contact and create HTML elements to display them
    contacts.forEach((c, index) => {
        const html = `
            <div class="contact" data-index="${index}">
                <p data-name="${c.name}" data-number="${c.number}">
                    ${c.name} <span><button onclick="editContact(this)">Edit</button></span>
                    <span><button onclick="deleteContact(this)">Delete</button></span>
                    <span><button onclick="showMore(this)">More</button></span>
                    <span><button onclick="closeButton(this)" style="display: none;">Close</button></span>
                </p>
                <div class="edit-form" style="display: none;">
                    <input type="text" class="edit-name" placeholder="New Name">
                    <input type="text" class="edit-number" placeholder="New Number">
                    <button onclick="saveEdit(this)">Save</button>
                    <button onclick="cancelEdit(this)">Cancel</button>
                </div>
            </div>
        `;

        // Insert the HTML into the container to display the contact
        showContact.insertAdjacentHTML("beforeend", html);
    });
});



/**
 * Deletes a contact from the contact list and local storage.
 *
 * @param {HTMLElement} button - The button element clicked to initiate the delete action.
 */
function deleteContact(button) {
    // Find the closest parent element with the class 'contact'
    const contactElement = button.closest('.contact');

    // Get the index of the contact from the data attribute
    const indexOrId = parseInt(contactElement.getAttribute('data-index'));

    // Delete the contact from local storage
    deleteContactFromStorage(indexOrId);

    // Remove the contact element from the contact list
    contactElement.remove();
}


/**
 * Displays more information about a contact when the "More" button is clicked.
 *
 * @param {HTMLElement} button - The button element clicked to initiate showing more information.
 */
function showMore(button) {
    // Find the closest parent element containing the contact's data attributes
    const contactElement = button.closest('.contact');

    // Get the name and number from the contact's data attributes
    const name = contactElement.getAttribute('data-name');
    const number = contactElement.getAttribute('data-number');

    // Hide the "More" button
    button.style.display = 'none';

    // Display the "Close" button
    const closeButton = contactElement.querySelector('[onclick="closeButton(this)"]');
    closeButton.style.display = 'inline-block';

    // Create a new element to display additional contact information
    const infoElement = document.createElement('div');
    infoElement.classList.add('infoElement');
    infoElement.innerHTML = `<h5>${name}</h5><p>${number}</p>`;

    // Append the new information element to the contact element
    contactElement.appendChild(infoElement);
}


/**
 * Closes the expanded information section of a contact.
 *
 * @param {HTMLElement} button - The button element clicked to initiate closing the information section.
 */
function closeButton(button) {
    // Find the closest parent element containing the contact's data attributes
    const contactElement = button.closest('.contact');

    // Get the "More" button inside the contact element
    const moreButton = contactElement.querySelector('[onclick="showMore(this)"]');
    
    // Display the "More" button
    moreButton.style.display = 'inline-block';

    // Remove the last child element, which is the information section
    contactElement.removeChild(contactElement.lastElementChild);

    // Hide the "Close" button
    button.style.display = 'none';
}


/**
 * Initiates the editing of a contact.
 *
 * @param {HTMLElement} button - The button element clicked to initiate the contact editing.
 */
function editContact(button) {
    // Find the closest parent element containing the contact
    const contactElement = button.closest('.contact');

    // Get the edit form within the contact element
    const editForm = contactElement.querySelector('.edit-form');

    // Get the input fields for editing the contact's name and number
    const nameInput = editForm.querySelector('.edit-name');
    const numberInput = editForm.querySelector('.edit-number');

    // Get the current name and number of the contact from data attributes
    const name = contactElement.querySelector('[data-name]').getAttribute('data-name');
    const number = contactElement.querySelector('[data-number]').getAttribute('data-number');

    // Set the input field values to the current contact details
    nameInput.value = name;
    numberInput.value = number;

    // Display the edit form
    editForm.style.display = 'block';
}


/**
 * Saves the edited contact details.
 *
 * @param {HTMLElement} button - The button element clicked to initiate saving the edited details.
 */
function saveEdit(button) {
    // Find the closest parent element containing the contact
    const contactElement = button.closest('.contact');

    // Get the edit form within the contact element
    const editForm = contactElement.querySelector('.edit-form');

    // Get the input fields for editing the contact's name and number
    const nameInput = editForm.querySelector('.edit-name');
    const numberInput = editForm.querySelector('.edit-number');

    // Get the index of the contact from the data attribute
    const index = parseInt(contactElement.getAttribute('data-index'), 10);

    // Update the contact's name and number in the 'contacts' array
    contacts[index].name = nameInput.value;
    contacts[index].number = numberInput.value;

    // Update the contact's name and number in local storage
    updateContactFromStorage(index, 'name', nameInput.value);
    updateContactFromStorage(index, 'number', numberInput.value);

    // Update the displayed contact details in the contact list
    const pElement = contactElement.querySelector('p');
    pElement.setAttribute('data-name', nameInput.value);
    pElement.setAttribute('data-number', numberInput.value);
    pElement.innerHTML = `${nameInput.value} <span><button onclick="editContact(this)">Edit</button></span> <span><button onclick="deleteContact(this)">Delete</button></span> <span><button onclick="showMore(this)">More</button></span> <span><button onclick="closeButton(this)" style="display: none;">Close</button></span>`;

    // Hide the edit form
    editForm.style.display = 'none';
}


/**
 * Cancels the editing of a contact.
 *
 * @param {HTMLElement} button - The button element clicked to initiate canceling the edit.
 */
function cancelEdit(button) {
    // Find the closest parent element containing the contact
    const contactElement = button.closest('.contact');

    // Get the edit form within the contact element
    const editForm = contactElement.querySelector('.edit-form');

    // Hide the edit form
    editForm.style.display = 'none';
}

  
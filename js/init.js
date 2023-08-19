// An array of sample contacts
const contactsArray = [
    { name: 'John Doe', number: '123456789' },
    { name: 'Alicia Keys', number: '987654321' },
    { name: 'Brad Pitt', number: '555555555' },
    { name: 'Emma Watson', number: '123123123' },
    { name: 'Chris Hemsworth', number: '111222333' },
    { name: 'Taylor Swift', number: '444555666' },
    { name: 'Angelina Jolie', number: '777888999' },
    { name: 'Leonardo DiCaprio', number: '555444333' },
    { name: 'Selena Gomez', number: '222111000' },
    { name: 'Justin Bieber', number: '999888777' },
    { name: 'Jennifer Lawrence', number: '666555444' },
    { name: 'Tom Hanks', number: '333222111' },
    { name: 'Natalie Portman', number: '777777777' },
    { name: 'Ryan Reynolds', number: '555555555' },
    { name: 'Mila Kunis', number: '222222222' },
    { name: 'Robert Downey Jr.', number: '999999999' },
    { name: 'Scarlett Johansson', number: '444444444' },
    { name: 'Will Smith', number: '111111111' },
    { name: 'Katy Perry', number: '666666666' },
    { name: 'Johnny Depp', number: '333333333' },
    // Add more contacts here
];

// Get contacts from local storage
const contacts = JSON.parse(localStorage.getItem('Contacts'));


/**
 * Adds a contact to local storage.
 *
 * @param {string} name - The name of the contact.
 * @param {string} number - The phone number of the contact.
 * @returns {boolean} Returns true if the contact was successfully added.
 */
function addContactToStorage(name, number) {
    // Check if localStorage is available in the current environment
    if (typeof localStorage !== 'undefined') {
        // Sanitize input values to ensure non-empty strings
        const storedName = (name && name != '') ? name : '';
        const storedNumber = (number && number.length > 0 && number !== '') ? number : '';

        let array;

        // Check if both name and number are provided
        if (storedName && storedNumber) {
            // Use existing contacts array or fallback to default contactsArray
            array = (contacts && contacts !== null && contacts !== undefined) ? contacts : contactsArray;

            // Add the new contact to the array
            array.push({ name: storedName, number: storedNumber });
        } else {
            // If name or number is missing, use default contactsArray
            array = contactsArray;
        }

        // Sort the contacts array by name
        array.sort((a, b) => a.name.localeCompare(b.name, "en", { ignorePunctuation: true }));

        // Update the 'Contacts' key in localStorage
        localStorageFunction('Contacts', array);
    }

    return true;
}

/**
 * Deletes a contact from local storage.
 *
 * @param {number} index - The index of the contact to delete.
 * @param {Array} array - The array of contacts from which to delete.
 * @returns {boolean} Returns true if the contact was successfully deleted.
 */
function deleteContactFromStorage(index, array) {
    // Ensure that the index is a valid integer
    index = parseInt(index);

    // Use provided 'array' or fallback to 'contacts' array or false
    array = (array && typeof array === 'object' && array.length > 0) ? array : (contacts && contacts.length > 0) ? contacts : false;

    // If 'array' is not valid, return false
    if (!array) {
        return false;
    }

    // Check if 'index' is within valid range
    if (index >= 0 && index < contacts.length) {
        // Remove the contact at the specified index
        contacts.splice(index, 1);

        // Update 'Contacts' in localStorage
        localStorageFunction('Contacts', array);
    }
}


/**
 * Updates a contact's attribute in local storage.
 *
 * @param {number} index - The index of the contact to update.
 * @param {string} attribute - The attribute to update (e.g., 'name' or 'number').
 * @param {any} value - The new value for the specified attribute.
 * @param {Array} array - The array of contacts in which to perform the update.
 * @returns {boolean} Returns true if the contact attribute was successfully updated.
 */
function updateContactFromStorage(index, attribute, value, array) {
    // Ensure that the index is a valid integer
    index = parseInt(index);

    // Use provided 'array' or fallback to 'contacts' array or false
    array = (array && typeof array === 'object' && array.length > 0) ? array : (contacts && contacts.length > 0) ? contacts : false;

    // If 'array' is not valid, return false
    if (!array) {
        return false;
    }

    // Check if 'index' is within valid range
    if (index >= 0 && index < array.length) {
        // Update the specified attribute with the new value
        array[index][attribute] = value;

        // Update 'Contacts' in localStorage
        localStorageFunction('Contacts', array);
    }
}


/**
 * Updates the localStorage with new contents for the given key.
 *
 * @param {string} name - The name of the localStorage key.
 * @param {any} contents - The contents to store in localStorage.
 */
function localStorageFunction(name, contents) {
    // Convert contents to JSON string if it's an object
    contents = (contents && typeof contents === 'object') ? JSON.stringify(contents) : contents;

    // Store the contents in localStorage under the specified key
    localStorage.setItem(name, contents);
}


/**
 * Event listener for when the DOM content is fully loaded.
 * Checks if contacts are present in local storage and adds them if not.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if 'contacts' array is empty or not present in local storage
    if (!contacts || contacts.length <= 0) {
        // Add default contacts to local storage
        addContactToStorage();
        
        // Reload the page to reflect the updated contacts
        location.reload(true);
    }
});



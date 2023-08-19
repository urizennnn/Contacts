'use strict';

import contacts from './view.js';

const spinnerContainer = document.getElementById('spinnerContainer');
const showContacts = document.querySelector('.search-results');
const search = document.querySelector('.search');

let searchTimeout; // To store the setTimeout reference

search.addEventListener('input', (e) => {
    // Clear any existing timeouts
    clearTimeout(searchTimeout);

    const searchValue = search.value.toLowerCase();

    // Show the spinner immediately
    spinnerContainer.classList.remove('hidden');

    // Set a timeout to hide the spinner after 3 seconds
    searchTimeout = setTimeout(() => {
        spinnerContainer.classList.add('hidden');
    }, 3000);

    // Clear the previous search results
    showContacts.innerHTML = '';

    // Loop through the contacts array and filter based on the search value
    contacts.forEach(contact => {
        const { name, number } = contact;
        if (name.toLowerCase().includes(searchValue) || number.includes(searchValue)) {
            // Create a new contact element and append it to the search results
            const contactElement = document.createElement('div');
            contactElement.textContent = `${name} - ${number}`;
            showContacts.appendChild(contactElement);
        }
    });
});

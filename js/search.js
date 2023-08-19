'use strict';

// Get a reference to the spinner container and search results container
const spinnerContainer = document.getElementById('spinnerContainer');
const showContacts = document.querySelector('.search-results');
const search = document.querySelector('.search');

// Initialize a variable to store the setTimeout reference
let searchTimeout;

// Listen for the 'input' event on the search input field
search.addEventListener('input', (e) => {
    // Clear any existing timeouts
    clearTimeout(searchTimeout);

    // Get the lowercase search value from the input field
    const searchValue = search.value.toLowerCase();

    // Set a timeout before starting the search
    searchTimeout = setTimeout(() => {
        // Hide all previously displayed contact elements
        document.querySelectorAll('.contact').forEach(contact => {
            contact.classList.add('hidden');
        });

        // Show the spinner
        spinnerContainer.classList.remove('hidden');

        // Simulate a time-consuming operation (e.g., fetching contacts)
        setTimeout(() => {
            // Loop through the contacts array and filter based on the search value
            contacts.forEach(contact => {
                const { name, number } = contact;
                if (name.toLowerCase().includes(searchValue) || number.includes(searchValue)) {
                    // Create a new contact element and append it to the search results
                    const contactElement = document.createElement('div');
                    contactElement.classList.add('contact');
                    contactElement.textContent = `${name} - ${number}`;
                    showContacts.appendChild(contactElement);
                }
            });

            // Hide the spinner when the filtering is done
            spinnerContainer.classList.add('hidden');
        }, 2000); // Simulating a time-consuming operation for demonstration

    }, 500); // Set a delay before starting the search
});

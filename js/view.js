'use strict';

const contacts = [
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
    { name: 'Johnny Depp', number: '333333333' }
    // Add more contacts here
];
if (typeof localStorage !== 'undefined') {
    const storedName = localStorage.getItem('Name');
    const storedNumber = localStorage.getItem('Number');

    if (storedName && storedNumber) {
        contacts.push({ name: storedName, number: storedNumber });
    }
}

contacts.sort((a, b) => a.name.localeCompare(b.name, "en", { ignorePunctuation: true }));
localStorage.setItem("Contacts", contacts)
document.addEventListener('DOMContentLoaded', () => {
    const showContact = document.querySelector('.contacts');

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
        showContact.insertAdjacentHTML("beforeend", html);
    });
});


function deleteContact(button) {
    const contactElement = button.closest('p');
    contactElement.remove();
}

function showMore(button) {
    const contactElement = button.closest('p');
    const name = contactElement.getAttribute('data-name');
    const number = contactElement.getAttribute('data-number');
    button.parentElement.removeChild(button)
    const closeButton = contactElement.querySelector('[onclick="closeButton(this)"]');
    closeButton.style.display = 'inline-block'; // Display the "Close" button

    const infoElement = document.createElement('div');
    infoElement.innerHTML = `<h5>${name}</h5><p>${number}</p>`;
    contactElement.appendChild(infoElement);
}

function closeButton(button) {
    const contactElement = button.closest('p');
    const moreButton = contactElement.querySelector('[onclick="showMore(this)"]');
    moreButton.style.display = 'inline-block'; // Display the "More" button
    contactElement.removeChild(contactElement.lastElementChild); // Remove the info section
    button.style.display = 'none'; // Hide the "Close" button
}
function editContact(button) {
    const contactElement = button.closest('.contact');
    const editForm = contactElement.querySelector('.edit-form');
    const nameInput = editForm.querySelector('.edit-name');
    const numberInput = editForm.querySelector('.edit-number');

    const name = contactElement.querySelector('[data-name]').getAttribute('data-name');
    const number = contactElement.querySelector('[data-number]').getAttribute('data-number');

    nameInput.value = name;
    numberInput.value = number;

    editForm.style.display = 'block';
}

function saveEdit(button) {
    const contactElement = button.closest('.contact');
    const editForm = contactElement.querySelector('.edit-form');
    const nameInput = editForm.querySelector('.edit-name');
    const numberInput = editForm.querySelector('.edit-number');
    const index = parseInt(contactElement.getAttribute('data-index'), 10);

    contacts[index].name = nameInput.value;
    contacts[index].number = numberInput.value;

    const pElement = contactElement.querySelector('p');
    pElement.setAttribute('data-name', nameInput.value);
    pElement.setAttribute('data-number', numberInput.value);
    pElement.innerHTML = `${nameInput.value} <span><button onclick="editContact(this)">Edit</button></span> <span><button onclick="deleteContact(this)">Delete</button></span> <span><button onclick="showMore(this)">More</button></span> <span><button onclick="closeButton(this)" style="display: none;">Close</button></span>`;

    editForm.style.display = 'none';
}

function cancelEdit(button) {
    const contactElement = button.closest('.contact');
    const editForm = contactElement.querySelector('.edit-form');
    editForm.style.display = 'none';
}
export default contacts
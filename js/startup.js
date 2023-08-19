'use strict'
const contactSelect = document.querySelector('#contact');
const contactDiv = document.querySelector('.contact');

contactSelect.addEventListener('change', () => {
    const contactVal = contactSelect.value;
    if (contactVal === 'phone') {
        contactDiv.innerHTML=''
        const html = `
         <label for="name">Name:</label>
            <input type="text" class="name" placeholder="Enter name" required>
            <label for="number">Phone Number:</label>
            <input type="number" class="num" name="iosPhoneNumber" pattern="^[+]?[0-9]*$" placeholder="Enter phone number" required>
            <ul>
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
        contactDiv.insertAdjacentHTML('afterbegin', html);

        const phoneButtons = document.querySelectorAll('.phone');
        phoneButtons.forEach(button => {
            button.addEventListener('click', () => {
                const num = document.querySelector('.num');
                num.value += button.textContent;
            });
        });
    }

    if (contactVal === 'form') {
        contactDiv.innerHTML=''
        const html = `
           <label for="name">Name:</label>
            <input type="text" class="name" placeholder="Enter name" required>
            <label for="number">Phone Number:</label>
            <input type="tel" class="number" name="iosPhoneNumber" pattern="^[+]?[0-9]*$" placeholder="Enter phone number" required>
            <button type="submit" class="submit" onclick="submit(this)">Submit</button>
            `

        contactDiv.insertAdjacentHTML('afterbegin', html)

    }
});

function submit() {
    const num = document.querySelector('.number')
    const user = document.querySelector('.name')
    const userValue = user.value
    const numValue = num.value
    if (numValue) localStorage.setItem('Number', numValue)
    if (userValue) localStorage.setItem('Name', userValue)
    if (!user.Value) {
        document.addEventListener('click', (e) => {
            e.preventDefault()
            alert('Please fill in the form')
        })
    } else {
        window.location.href = 'view.html';
    }
}
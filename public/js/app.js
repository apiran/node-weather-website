const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${encodeURIComponent(location)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;                   
                messageTwo.textContent = '';  // Clear the second message in case of an error
            } else {
                messageOne.textContent = data.location; // Display the searched location
                messageTwo.textContent = `${data.temperature}°C, ${data.weather}`;
            }
        })
        .catch((error) => {
            messageOne.textContent = 'An error occurred while fetching the weather data.';
            messageTwo.textContent = '';
            console.error('Error:', error);
        });
});

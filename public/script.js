document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('dropdown-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const dropdownValue = document.getElementById('variable-dropdown').value;
        const dropdownValue2 = document.getElementById('variable-dropdown2').value;
        const dropdownValue3 = document.getElementById('variable-dropdown3').value;
        let selectedValues = [];

        // Collect selected values from dynamically generated dropdowns
        for (let i = 0; i < dropdownValue; i++) {
            const dropdown = document.getElementById(`dynamic-dropdown-${i+1}`);
            if (dropdown) { // Check if dropdown exists
                const selectedValue = dropdown.options[dropdown.selectedIndex].value;
                selectedValues.push(selectedValue);
            }
        }

        // Create a comma-separated string of selected values
        const selectedValuesString = selectedValues.join(', ');

        // Construct the prompt with the selected values
        const prompt = `Provide 5 chord progression options in ${dropdownValue2} ${dropdownValue3} key for ${dropdownValue} measures, following the tonal functions in the order specified by: ${selectedValuesString}. Please simply suggest the options.`;

        try {
            const response = await fetch('http://localhost:3001/generate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            // Log the raw response to debug
            const rawResponse = await response.text();
            console.log('Raw response:', rawResponse);

            const data = JSON.parse(rawResponse); // Explicitly parse the response
            console.log('Dropdown-based text generation response:', data);

            const resultSentence = data.choices[0].message.content;

            // Append the user and chatbot messages to the chat history
            appendMessage('user', prompt);
            appendMessage('chatbot', resultSentence);

        } catch (error) {
            console.error('Error:', error);
            appendMessage('chatbot', 'Error: ' + error.message);
        }
    });

    document.getElementById('ask-button').addEventListener('click', async (event) => {
        event.preventDefault();

        const inputValue = document.getElementById('notes-output').value;

        // Construct the prompt using the input value
        const prompt = `Provide 5 harmonic note arrangement options (including inversions) for 4 voices based on ${inputValue} with suitable octave numbers. Please simply suggest the options.`;

        try {
            const response = await fetch('http://localhost:3001/generate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            // Log the raw response to debug
            const rawResponse = await response.text();
            console.log('Raw response:', rawResponse);

            const data = JSON.parse(rawResponse); // Explicitly parse the response
            console.log('Text generation response:', data);

            const resultSentence = data.choices[0].message.content;

            // Append the user and chatbot messages to the chat history
            appendMessage('user', prompt);
            appendMessage('chatbot', resultSentence);

        } catch (error) {
            console.error('Error:', error);
            appendMessage('chatbot', 'Error: ' + error.message);
        }
    });

    // Handle dynamic dropdown creation
    document.getElementById('variable-dropdown').addEventListener('change', (event) => {
        const dropdownValue = event.target.value;  // Get the selected value from the dropdown
        const container = document.getElementById('dynamic-dropdown-container');  // Reference the container for the new dropdowns

        // Clear any existing dropdowns in the container
        container.innerHTML = '';

        // Create the number of dropdowns based on the dropdownValue
        for (let i = 0; i < dropdownValue; i++) {
            const newDropdown = document.createElement('select');
            newDropdown.id = `dynamic-dropdown-${i+1}`;  // Unique ID for each dropdown

            // Populate each dropdown with options
            newDropdown.innerHTML = `
                <option value="tonic">Start</option>
                <option value="subdominant">Rising</option>
                <option value="dominant">Peak</option>
                <option value="submediant">Semi-End</option>
                <option value="tonic">End</option>
            `;

            // Append the new dropdown to the container
            container.appendChild(newDropdown);
        }
    });

    // Function to create and append a new message element
    function appendMessage(role, content) {
        const chatHistory = document.getElementById('text-result-1');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + (role === 'user' ? 'user-message' : 'chatbot-message');
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
    }

    // Handle chord input
    document.getElementById('get-notes-button').addEventListener('click', () => {
        // Get the chord input value
        const chordInput = document.getElementById('chord-input').value.trim();
        
        // Get the notes from the chord using Tonal.js
        const chord = Tonal.Chord.get(chordInput);
        const chordNotes = chord.notes || []; // If chord is invalid, notes will be an empty array
        
        // Display the notes in the output field
        document.getElementById('notes-output').value = chordNotes.join(' ');
    });

});

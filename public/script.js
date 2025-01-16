////// section one start

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('task-button').addEventListener('click', async (event) => {
    event.preventDefault();

    const inputValue = document.getElementById('task-input').value;
    const inputValue2 = document.getElementById('user-input').value;
    const inputValue3 = document.getElementById('number-input').value;

    // Construct the prompt using the input value
    const prompt = `Provide a task specification about ${inputValue} consisting of ${inputValue3} actions, aligned with hierarchical task analysis and considering ${inputValue2} as the user. Please simply suggest the tasks.`;

    try {
        const response = await fetch('http://localhost:3001/generate-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Text generation response:', data);

        if (data.message) {
            appendMessage('user', prompt, 'text-result-1');
            appendMessage('chatbot', data.message, 'text-result-1');
        } else {
            throw new Error('Unexpected response structure: missing "message"');
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('chatbot', 'Error: ' + error.message, 'text-result-1');
    }
});

////// section one end


////// section two start

    document.getElementById('dropdown-form2').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const dropdownValue = document.getElementById('variable-dropdown').value;
        const dropdownValue2 = document.getElementById('variable-dropdown2').value;
        const dropdownValue3 = document.getElementById('variable-dropdown3').value;
        let selectedValues = [];

        // Collect selected values from dynamically generated dropdowns
        for (let i = 0; i < dropdownValue; i++) {
            const dropdown = document.getElementById(`dynamic-dropdown-${i+1}`);
            if (dropdown) {
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
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Dropdown-based text generation response:', data);

            if (data.message) {
                appendMessage('user', prompt, 'text-result-2');
                appendMessage('chatbot', data.message, 'text-result-2');
            } else {
                throw new Error('Unexpected response structure: missing "message"');
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('chatbot', 'Error: ' + error.message, 'text-result-2');
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
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Text generation response:', data);

            if (data.message) {
                appendMessage('user', prompt, 'text-result-2');
                appendMessage('chatbot', data.message, 'text-result-2');
            } else {
                throw new Error('Unexpected response structure: missing "message"');
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('chatbot', 'Error: ' + error.message, 'text-result-2');
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
                <option value="tonic">End</option>
                <option value="nonchord">Warning</option>
                <option value="prolongation">Continue</option>
            `;

            // Append the new dropdown to the container
            container.appendChild(newDropdown);
        }
    });

    // Function to create and append a new message element
    function appendMessage(role, content, outputElementId) {
        const chatHistory = document.getElementById(outputElementId);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + (role === 'user' ? 'user-message' : 'chatbot-message');
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Handle chord input
    document.getElementById('get-notes-button').addEventListener('click', (event) => {
        event.preventDefault();
        // Get the chord input value
        const chordInput = document.getElementById('chord-input').value.trim();
        
        // Get the notes from the chord using Tonal.js
        const chord = Tonal.Chord.get(chordInput);
        const chordNotes = chord.notes || []; // If chord is invalid, notes will be an empty array
        
        // Display the notes in the output field
        document.getElementById('notes-output').value = chordNotes.join(' ');
    });
});

////// section two end
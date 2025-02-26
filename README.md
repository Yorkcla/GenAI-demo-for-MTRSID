# GenAI-demo-for-MTRSID

This is a GenAI-powered demonstration of a design framework for musical tension and release (tonal cognition) in sonic interaction design (MTRSID). It will be presented at the CHI Conference on Human Factors in Computing Systems, with a publication link forthcoming.

## Installation

To set up the project locally, follow these steps:


1. **Clone the repository**:
   ```bash
   git clone https://github.com/Yorkcla/GenAI-demo-for-MTRSID.git
   cd GenAI-demo-for-MTRSID
   ```


2. **Install Node.js**:
   Download and install Node.js from [here](https://nodejs.org/). This will also install npm (Node Package Manager) automatically.


3. **Install dependencies**:
   After installing Node.js, ensure that you have npm installed. Then run the following command to install the project dependencies listed in the `package.json` file:
   ```bash
   npm install
   ```


   The required dependencies include:
   - `cors`
   - `dotenv`
   - `express`
   - `openai`


4. **Set up the OpenAI API key**:
   Create or open the `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```


5. **Verify Configuration**:
    For development with Live Server, check settings.json to ensure it aligns with your project requirements. After completing these steps, the application should be ready to run.

## Usage

To start the application, run the following command in your terminal:


```bash
npm start
```


Once the server is running, you can access the application in your web browser at `http://localhost:5501` (check your local settings for the port number).

### Application Overview

The interface consists of three main sections:

1. Task Specification Panel (Left Section)
    Requires three inputs: task, user, and number of actions.

2. Chord Progression & Note Arrangement (Middle Section)
    Select the number of tasks and tonality for chord progression.
    Input a chord and specify components using the note button, directly linking to the note arrangement feature.

3. Key Modulation & Altered Chord Generation (Right Section)
    Choose the number of phases, tonality, and musical genre for key modulation.
    Input a chord for altered chord generation.

Further details will be available in the forthcoming publication.

## License

This project is licensed under the MIT License, which allows for reuse, modification, and distribution under certain conditions. See the [LICENSE](LICENSE) file for full details.
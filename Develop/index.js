// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Project Title: ',
        name: 'projectTitle'
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Table of Contents: ',
        name: 'tableContents'
    },
    {
        type: 'input',
        message: 'Installation',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'Usage: ',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Contributing: ',
        name: 'contributing'
    },
    {
        type: 'input',
        message: 'Tests: ',
        name: 'tests'
    },
    {
        type: 'input',
        message: 'Questions: ',
        name: 'questions'
    }
];

const answers = {}

// TODO: Create a function to write README file
// function writeToFile(fileName, data) {
//     // fileName = () => { `README-${data.projectTitle.toLowerCase().split(' ').join('')}.md`; }

//     // data = () => {
//     //     console.log(JSON.stringify(data))};
//     console.log(answers)
// }

// TODO: Create a function to initialize app
function init() {
    //Welcome user
    console.log('Welcome to the Professional README generator. Please fill out your project information...');

    //ask user each question in array 
    inquirer
        .prompt(questions)
        .then(data => {
            //use projectTitle to create filename
            const fileName = `README-${data.projectTitle.toLowerCase().split(' ').join('')}.md`;
            //use data to build template literal 
            const content = `#${data.projectTitle}<br/>
            ${data.description}<br/>
            ##Table of Contents<br/>
            ${data.tableContents}<br/>
            ##Installation<br/>
            ${data.installation}<br/>
            ##Usage<br/>
            ${data.usage}<br/>
            ##Contributing<br/>
            ${data.contributing}<br/>
            ##Tests<br/>
            ${data.tests}<br/>
            ##Questions<br/>
            ${data.questions}
            `;

        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error('prompt could not be rendered in the current environment')
            } else {
                // Something else went wrong
                console.error('something went wrong')
            }
        });
}

// Function call to initialize app
init();

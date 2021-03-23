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

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    //use template literal to build document
}

// TODO: Create a function to initialize app
async function init() {
    //Welcome user
    console.log('Welcome to the Professional README generator. Please fill out your project information...');

    //ask user each question in array 
    inquirer
        .prompt(questions)
        .then(data => {
            console.log(data)
            // fs.writeFile('answers.json', JSON.stringify(answers), (error) => {if (error) console.log('Oh no', error)})
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
    //output answers to a new array
}


// Function call to initialize app
init();

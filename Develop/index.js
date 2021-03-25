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
    console.log('Welcome to the README generator. Please input your project information (Markdown supported)')
    inquirer
        .prompt(questions)
        .then (data => {
            //create template literal from data for both the file name and its contents
            const fileName = `README-${data.projectTitle.toLowerCase().split(' ').join('')}.md`;
            
            const fileContent = `# ${data.projectTitle}  
            ${data.description} 

            ## Table of Contents  
            ${data.tableContents} 

            ## Installation  
            ${data.installation} 

            ## Usage  
            ${data.usage}  

            ## Contributing  
            ${data.contributing}  

            ## Tests  
            ${data.tests} 

            ## Questions  
            ${data.questions}`;

            fs.writeFile(fileName, fileContent, (err) =>
            err ? console.error(err) : console.log('Success!'))
        })
        .catch (error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error('prompt could not be rendered in the current environment')
            } else {
                // Something else went wrong
                console.error('something went wrong')
            }
        });
}

// TODO: Create a function to initialize app
function init() {
    writeToFile();
}

// Function call to initialize app
init();

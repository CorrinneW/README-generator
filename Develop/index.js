// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please enter your project title: ',
        name: 'projectTitle'
    },
    {
        type: 'input',
        message: 'Please enter a brief description of your project: ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Please enter installation instructions:',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'Please enter usage instructions: ',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Please enter instructions for contributing to your project: ',
        name: 'contributing'
    },
    {
        type: 'input',
        message: 'Please enter testing procedures: ',
        name: 'tests'
    },
    {
        type: 'input',
        message: 'Please enter your gitHub username: ',
        name: 'githubUserName'
    },
    {
        type: 'input',
        message: 'Please enter your email: ',
        name: 'userEmail'
    },
    {
        type: 'list',
        message: 'Select a license:',
        name: 'license',
        choices: ['Apache 2.0', 'MIT License', 'GPLv3'],
    }
];

//global object to receive data from inquirer
const answers = {};

//provides badges and license text to  getLicense function and writeToFile function
const licenses = [
    {
        name: 'Apache 2.0',
        badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
        text: `Licensed under the Apache License, Version 2.0`
    },

    {
        name: 'MIT License',
        badge: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
        text: `Licensed under the MIT License`

        },

    {
        name: 'GPLv3',
        badge: `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
        text: `Licensed under GPLv3`
    }
];

//global variables for license badge and text
let licenseBadge;
let licenseText;

//function to generate license badge and text from license object
function getLicense() {

    if (answers.license === 'Apache 2.0') {
        licenseBadge = licenses[0].badge;
        licenseText = licenses[0].text;
    } else if (answers.license === 'MIT License') {
        licenseBadge = licenses[1].badge;
        licenseText = licenses[1].text;
    } else if (answers.license === 'GPLv3') {
        licenseBadge = licenses[2].badge;
        licenseText = licenses[2].text;
    } else {
        licenseBadge = '';
        licenseText = '';
    };
};

// TODO: Create a function to write README file
//template literal forms basic structure of README
function writeToFile() {
    const projectTitle = answers.projectTitle;

    const fileName = projectTitle.replace(/\s+/g, '-').toLowerCase()

    const fileContent = 
 `${licenseBadge}

 # ${projectTitle}  
 ${answers.description} 

 ## Table of Contents  
 * [Installation] (https://github.com/${answers.githubUserName}/${fileName}#installation)
 * [Usage] (https://github.com/${answers.githubUserName}/${fileName}#usage)
 * [Contributing] (https://github.com/${answers.githubUserName}/${fileName}#contributing)
 * [Tests] (https://github.com/${answers.githubUserName}/${fileName}#tests)
 * [Questions] (https://github.com/${answers.githubUserName}/${fileName}#questions)
 * [License] (https://github.com/${answers.githubUserName}/${fileName}#license)

 ## Installation  
 ${answers.installation} 

 ## Usage  
 ${answers.usage}  

 ## Contributing  
 ${answers.contributing}  

 ## Tests  
 ${answers.tests} 

 ## Questions  
 Please field any additional questions to: GitHub Profile ${answers.githubUserName} (https://github.com/${answers.githubUserName}) Email: ${answers.userEmail}
 
 ## License
 ${licenseText}`;

    fs.writeFile(`${fileName}.md`, fileContent, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Success!')
        }
    })


}

// TODO: Create a function to initialize app
function init() {
    console.log('Welcome to the README generator. Please input your project information (Markdown supported)')
    inquirer
        .prompt(questions)
        .then(data => {
            //add data to global object
            const returnedAnswers = Object.assign(answers, data);
            //assigns content to global userName at top of document
            userName = JSON.stringify(returnedAnswers.userName);
            //generate license badge and text
            getLicense(returnedAnswers);
            //generate template literal for readme content
            writeToFile(returnedAnswers);
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
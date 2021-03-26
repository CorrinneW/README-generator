// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Copyright Owner Name:',
        name: 'copyrightOwner'
    },
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
        message: 'To direct user questions to your gitHub, provide your gitHub username: ',
        name: 'questions'
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

//global variables to fill copyright date and holder in license text
const currentYear = new Date().getFullYear();

const licenses = [
    {
        name: 'Apache 2.0',
        badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
        text: `Copyright ${currentYear} ${answers.copyrightOwner}

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
     
          [Apache.org](http://www.apache.org/licenses/LICENSE-2.0)
     
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`
    },

    {
        name: 'MIT License',
        badge: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
        text: `Copyright ${currentYear} ${answers.copyrightOwner}

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    },

    {
        name: 'GPLv3',
        badge: `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
        text: `Copyright (C) ${currentYear}  ${answers.copyrightOwner}

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.
    
        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.
    
        You should have received a copy of the GNU General Public License
        along with this program.  If not, see [GNU.org](http://www.gnu.org/licenses/).`
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
    console.log(licenseBadge, licenseText);
};

// TODO: Create a function to write README file
//template literal forms basic structure of README
function writeToFile() {
    const fileName = answers.projectTitle;
    //generate license badge and text
    getLicense();
    const fileContent = `${licenseBadge}
            # ${answers.projectTitle}  
            ${answers.description} 

            ## Table of Contents  
            ${answers.tableContents} 

            ## Installation  
            ${answers.installation} 

            ## Usage  
            ${answers.usage}  

            ## Contributing  
            ${answers.contributing}  

            ## Tests  
            ${answers.tests} 

            ## Questions  
            ${answers.questions}
            
            ##License
            ${licenseText}`;

    fs.writeFile(fileName, fileContent, (err) => {
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
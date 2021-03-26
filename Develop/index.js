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

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log('Welcome to the README generator. Please input your project information (Markdown supported)')
    inquirer
        .prompt(questions)
        .then(data => {
            //create template literal from data for both the file name and its contents
            const fileName = `README-${data.projectTitle.toLowerCase().split(' ').join('')}.md`;

            //gets license badge and text
            const { licenseBadge, license } = getLicense();

            //generate license badge and text from user selection/input
            function getLicense(data) {
                const currentYear = new Date().getFullYear();

                const copyrightOwner = data.copyrightOwner;

                //generates license badge and text
                if (data.license === 'Apache 2.0') {
                    licenseBadge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;

                    license = `Copyright ${currentYear} ${copyrightOwner}

                    Licensed under the Apache License, Version 2.0 (the "License");
                    you may not use this file except in compliance with the License.
                    You may obtain a copy of the License at
                 
                      [Apache.org](http://www.apache.org/licenses/LICENSE-2.0)
                 
                    Unless required by applicable law or agreed to in writing, software
                    distributed under the License is distributed on an "AS IS" BASIS,
                    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                    See the License for the specific language governing permissions and
                    limitations under the License.`
                } else if (data.license === 'MIT License') {
                    licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;

                    license = `Copyright ${currentYear} ${copyrightOwner}

                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    
                    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
                } else if (data.license === 'GPLv3') {
                    licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;

                    license = `Copyright (C) ${currentYear}  ${copyrightOwner}

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

                return {
                    licenseBadge,
                    license
                }
            };

            const fileContent = `${licenseBadge}
            # ${data.projectTitle}  
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
            ${data.questions}
            
            ##License
            ${license}`;

            fs.writeFile(fileName, fileContent, (err) =>
                err ? console.error(err) : console.log('Success!'))
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

// TODO: Create a function to initialize app
function init() {
    writeToFile();
}

// Function call to initialize app
init();

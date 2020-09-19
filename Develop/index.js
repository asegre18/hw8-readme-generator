const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function init() {
console.log('beginning of hw');
const userInput = await inquirer.prompt([
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username'
    },
    {
        type: 'input',
        message: 'What is your Project Title?',
        name: 'repoTitle'
    },
    {
        type: 'input',
        message: 'What is your GitHub Email?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Please enter a brief description of your project',
        name: 'descr'
    },
    {
        type: 'input',
        message: 'Enter the details for your Table of Contents here',
        name: 'tableOfContents'
    },
    {
        type: 'input',
        message: 'What steps are required to install your project?',
        name: 'install'
    },
    {
        type: 'input',
        message: 'Provide instructions for using your project here',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Provide license name here',
        name: 'license'
    },
    {
        type: 'input',
        message: 'Enter the usernames of any contributors to this project (separate the usernames witha a comma!)',
        name: 'contributors'
    },
    {
        type: 'input',
        message: 'Enter examples of how to run tests here',
        name: 'tests'
    },
    {
        type: 'input',
        message: 'Any questions you would like to ask go here',
        name: 'questions'
    }
]);

console.log(userInput);
// init variables pulled from userInput
const username = userInput.username;
const repoTitle = userInput.repoTitle;
const email = userInput.email;
const description = userInput.descr;
const tableOfContents = userInput.tableOfContents;
const install = userInput.install;
const usage = userInput.usage;
const license = userInput.license;
const contributors = userInput.contributors;
const tests = userInput.tests;
const questions = userInput.questions;

// pull data from github API given the userInput
const response = await axios.get(`https://api.github.com/users/${username}`);
const gitResponse = response.data;
console.log(data);
const gitHubUsername = gitResponse.login;
const gitHubEmail = gitResponse.email;
const gitHubLocation = gitResponse.location;
const gitHubURL = gitResponse.html_url;
const profilePic = gitResponse.avatar_url;
const contributorsList = contributors.split(',');

let writeReadMe = fs.writeFileSync(path.join(__dirname, 'GeneratedReadMe', 'README.md',
`
# ${repoTitle}
${description}
## Table of Contents
${tableOfContents}
## Installation
${install}
## Usage
${usage}
## License
${license}
##Contributing
${contributors}
## Test
${tests}
## Questions
${questions}
## Author
${profilePic}
${gitHubUsername}
Email: ${gitHubEmail}
Location: ${gitHubLocation}
GitHub URL: ${gitHubURL}
Contributors: ${contributorsList}
`
))
fs.writeFileSync(writeReadMe);
console.log('Success!');
}
init();

// Notes:
// axios is similar to ajax - how you can make request to githubAPI
// test on postman
// githubAPI = https://api.github.com/search/users?q=asegre18
// if {total_count > 0} ...
// does the prof pic and email exist 
// pic - avatar_url
// prompt for github email address 
// - if time check if email is paired with username but not MVP


// Badges - go through good ReadMe guide link and you can create your own badges - at bottom of linked page in this read me
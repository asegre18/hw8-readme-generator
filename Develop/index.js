const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const questions = [
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
];

function init() {
console.log('beginning of hw');
inquirer.prompt(questions).then(async response => {
console.log(response);
// init variables pulled from response
const username = response.username;
const repoTitle = response.repoTitle;
const email = response.email;
const description = response.descr;
const tableOfContents = response.tableOfContents;
const install = response.install;
const usage = response.usage;
const license = response.license;
const contributors = response.contributors;
const tests = response.tests;
const questions = response.questions;

// pull data from github API given the userInput
const response2 = await axios.get(`https://api.github.com/users/${username}`).catch(error => console.log(error));
const gitResponse = response2.data;
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

})
}
init();

// Notes:
// Badges - go through good ReadMe guide link and you can create your own badges - at bottom of linked page in this read me
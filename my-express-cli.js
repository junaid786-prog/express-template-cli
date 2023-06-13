#!/usr/bin/env node
const shell = require('shelljs');

async function run() {
    const { createPromptModule } = await import('inquirer');
    const prompt = createPromptModule();
    const { projectName, description, author } = await prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter a name for your new project:',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for your new project:',
        },
        {
            type: 'input',
            name: 'author',
            message: 'Enter your name or username:',
        },
    ]);

    console.log('Creating a new Express.js backend API project...');
    shell.exec(
        `git clone https://github.com/your-username/my-express-api-template.git ${projectName}`
    );
    shell.sed('-i', 'my-express-api-template', projectName, `${projectName}/package.json`);
    shell.sed('-i', 'A simple Express.js backend API template.', description, `${projectName}/package.json`);
    shell.sed('-i', '"name": "Your Name"', `"name": "${author}"`, `${projectName}/package.json`);

    console.log(`Success! Your new project has been created in the ${projectName} directory.`);
    console.log('To get started, run:');
    console.log(`cd ${projectName}`);
    console.log('npm install');
    console.log('npm start');
}

run();

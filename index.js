#! /usr/bin/env node
/* eslint-disable no-console */
'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const args = process.argv.slice(2);
const action = args[0];
const actionArgs = args.slice(1);

/*
 * Register Yeoman commands to run in the enspire scope
 * */
const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

const yoGens = [
    'angular',
    'angular:controller',
    'angular:directive',
    'angular:filter',
    'definition:action-menu',
    'definition:data-filter',
    'definition:data-grid',
    'definition:navigation-menu'
];

yoGens.forEach(gen => env.register(require.resolve('./lib/generator-enspire/' + gen)));

const aryActions = [
    'acl'
];

const help = () => {

    console.log(`
Usage:
  enspire angular [<moduleName>] [<description>]
  enspire angular:controller [<moduleName>] [<controllerName>] [<description>]
  enspire angular:directive [<moduleName>] [<directiveName>] [<restrict>] [<description>]
  enspire angular:filter [<moduleName>] [<filterName>] [<description>]
    
  enspire definition:action-menu [<name>] [<description>]
  enspire definition:data-filter [<name>] [<description>]
  enspire definition:data-grid [<name>] [<description>]
  enspire definition:include [<name>] [<description>]
  enspire definition:modal [<name>] [<description>]
  enspire definition:navigation-menu [<name>] [<description>]
  enspire definition:notification [<name>] [<description>]
  enspire definition:screen [<name>] [<description>]
    
  enspire template:include [<name>]
  enspire template:modale [<name>]
  enspire template:notification [<name>]
  enspire template:screen [<name>]
    `);

};

let isYeoman = false;
let isAction = false;

yoGens.forEach((gen) => {

    if (action === gen) {

        isYeoman = true;

    }

});

if (isYeoman) {

    env.run(`enspire:${action} ${actionArgs.join(' ')}`, () => {});

} else {

    aryActions.forEach(gen => {

        if (action === gen) {

            isAction = true;

        }

    });

    if (isAction) {

        inquirer.prompt([
            {
                type: 'list',
                name: 'aclServer',
                message: 'Where is the ACL service?',
                default: 'remote',
                choices: ['remote', 'local']
            },
            {
                type: 'input',
                name: 'subdomain',
                message: 'What is the subdomain of the environment?',
                default: 'wwwww'
            }, {
                type: 'input',
                name: 'username',
                message: 'Please provide your developers username?',
                default: 'aaaaaa'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Please provide your password?'
            }]).then(() => {

            console.log('Now watching for changes in `lib` folder...');

            fs.watch('lib', { recursive: true }, (eventType, filename) => {

                if (!filename.endsWith('___')) {

                    console.log(`event type is: ${eventType}`);
                    if (filename) {

                        console.log(`filename provided: ${filename}`);

                    } else {

                        console.log('filename not provided');

                    }

                }

            });

        });

    } else {

        help();

    }

}

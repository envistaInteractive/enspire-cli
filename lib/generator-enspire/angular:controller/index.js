'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor (args, opts) {

        super(args, opts);

        // This required arguments.
        this.argument('moduleName', { type: String, required: false, desc: 'Module Name' });
        this.argument('controllerName', { type: String, required: false, desc: 'Controller Name' });
        this.argument('description', { type: String, required: false, desc: 'Description' });

    }

    prompting () {

        // And you can then access it later; e.g.

        return this.prompt([
            {
                type: 'input',
                name: 'moduleName',
                message: 'Your module name',
                default: this.options.moduleName
            },
            {
                type: 'input',
                name: 'controllerName',
                message: 'Your controller name',
                default: this.options.controllerName
            },
            {
                type: 'input',
                name: 'description',
                message: 'Your controller description',
                default: ''
            }]).then((answers) => {

            const destinationPath = `lib/angular/${answers.moduleName}/controllers/${answers.controllerName}.js`;
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath(destinationPath),
                {
                    moduleName: answers.moduleName,
                    controllerName: answers.controllerName,
                    description: answers.description
                }
            );

        });

    }

};

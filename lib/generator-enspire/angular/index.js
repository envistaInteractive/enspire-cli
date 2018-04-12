'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor (args, opts) {

        super(args, opts);

        // This required arguments.
        this.argument('moduleName', { type: String, required: false, desc: 'Module Name' });
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
                name: 'description',
                message: 'Your module description',
                default: ''
            }]).then((answers) => {

            this.fs.copyTpl(
                this.templatePath('module.js'),
                this.destinationPath('lib/angular/' + answers.moduleName + '/module.js'),
                {
                    moduleName: answers.moduleName,
                    description: answers.description
                }
            );

        });

    }

};

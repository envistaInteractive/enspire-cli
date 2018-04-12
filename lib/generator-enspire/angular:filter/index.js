'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor (args, opts) {

        super(args, opts);

        // This required arguments.
        this.argument('moduleName', { type: String, required: false, desc: 'Module Name' });
        this.argument('filterName', { type: String, required: false, desc: 'Filter Name' });
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
                name: 'filterName',
                message: 'Your filter name',
                default: this.options.filterName
            },
            {
                type: 'input',
                name: 'description',
                message: 'Your data filter description',
                default: ''
            }]).then((answers) => {

            const destinationPath = `lib/angular/${answers.moduleName}/filters/${answers.filterName}.js`;

            this.fs.copyTpl(
                this.templatePath('filter.js'),
                this.destinationPath(destinationPath),
                {
                    moduleName: answers.moduleName,
                    filterName: answers.filterName,
                    description: answers.description
                }
            );

        });

    }

};

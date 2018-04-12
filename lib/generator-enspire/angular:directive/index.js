'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor (args, opts) {

        super(args, opts);

        // This required arguments.
        this.argument('moduleName', { type: String, required: false, desc: 'Module Name' });
        this.argument('directiveName', { type: String, required: false, desc: 'Directive Name' });
        this.argument('restrict', { type: String, required: false, desc: 'Restrict' });
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
                name: 'directiveName',
                message: 'Your directive name',
                default: this.options.directiveName
            },
            {
                type: 'list',
                name: 'restrict',
                message: 'Restrict your directive to',
                default: this.options.restrict,
                choices: ['E', 'A', 'C', 'M', 'EA', 'EC', 'EM', 'AC', 'AM', 'CM', 'EAC', 'ECM', 'EAM', 'ACM', 'EACM']
            },
            {
                type: 'input',
                name: 'description',
                message: 'Your directive description',
                default: ''
            }]).then((answers) => {

            const destinationPath = `lib/angular/${answers.moduleName}/directives/${answers.directiveName}.js`;

            this.fs.copyTpl(
                this.templatePath('directive.js'),
                this.destinationPath(destinationPath),
                {
                    moduleName: answers.moduleName,
                    directiveName: answers.directiveName,
                    restrict: answers.restrict,
                    description: answers.description
                }
            );

        });

    }

};

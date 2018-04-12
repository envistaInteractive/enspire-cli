'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor (args, opts) {

        super(args, opts);

        // This required arguments.
        this.argument('name', { type: String, required: false, desc: 'Name' });
        this.argument('description', { type: String, required: false, desc: 'Description' });

        this.definitionType = 'navigation';

    }

    prompting () {

        // And you can then access it later; e.g.
        var self = this;

        var strName = this.options.name;
        if (!strName.startsWith(self.definitionType + '.')) {

            strName = self.definitionType + '.' + strName;

        }

        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name',
                default: strName,
                validate: input => {

                    var filtered = input.replace(/[^\w.]/g, '');
                    var response = false;
                    if (input === filtered) {

                        if (input.startsWith(self.definitionType + '.')) {

                            response = true;

                        } else {

                            response = 'Name must start with "' + self.definitionType + '."';

                        }

                    } else {

                        response = 'Invalid characters - only [a-z0-9_.]';

                    }
                    return response;

                },
                filter: function (input) {

                    return input.toLowerCase();

                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Your navigation menu description',
                default: ''
            }]).then((answers) => {

            var filePath = '';
            var aryFilePath = answers.name.split('.');
            for (var i = 0;i < aryFilePath.length;i++) {

                if (i === 0 && aryFilePath[i] === this.definitionType) {
                    //skip
                } else {

                    if (filePath !== '') {

                        filePath += '/';

                    }
                    filePath += aryFilePath[i];

                }

            }

            const destinationPath = `lib/definitions/navigation-menu/${filePath}.json`;

            this.fs.copyTpl(
                this.templatePath('navigation-menu.json'),
                this.destinationPath(destinationPath),
                {
                    name: answers.name,
                    description: answers.description
                }
            );

        });

    }

};

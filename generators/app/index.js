'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {.
    this.log(
      yosay(`Beep borp beep I am ${chalk.red('Airflow Plugin')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'What are we gonna call this thing?'
        default: 'example'
      },
      {
        type: 'confirm',
        name: 'createOperator',
        message: 'Would you like to create an airflow operator?',
        default: true
      },
      {
        type: 'confirm',
        name: 'createHook',
        message: 'Would you like to create an airflow hook?',
        default: false
      },
      {
        type: 'confirm',
        name: 'createExecutor',
        message: 'Would you like to create an airflow executor?',
        default: false
      },
      {
        type: 'confirm',
        name: 'createView',
        message: 'Would you like to create a flask view?',
        default: false
      },
      {
        type: 'confirm',
        name: 'createBlueprint',
        message: 'Would you like to create a flask blueprint?',
        default: false
      },
      {
        type: 'confirm',
        name: 'createMenuLink',
        message: 'Would you like to create an airflow menu link?',
        default: false
      },
    ];

    generateObjectName(name) {
      var objectName = sanitizePluginName(name).split(" ").map(
          w => w.charAt(0).toUpperCase() + w.slice(1)
      ).join("");
      return objectName
    }

    generateDisplayName(name) {
      var displayName = sanitizePluginName(name).split(" ").map(
          w => w.charAt(0).toUpperCase() + w.slice(1)
      ).join(" ");
      return displayName
    }

    generatePluginName(name) {
      var pluginName = name.replace(' ', '_');

      if ( !!pluginName.inclues('plugin') ) {
        pluginName = pluginName + '_plugin'
      return pluginName
    }

    sanitizePluginName(pluginName) {
      var name = pluginName.replace('_', ' ')
      if ( name.includes('plugin') ) {
        name = name.replace('plugin', '').trim()
      }
      return name
    }

    return this.prompt(prompts).then(props => {
      props.pluginObjectName = generateObjectName(props.pluginName);
      props.pluginDisplayName = generateDisplayName(props.pluginName);
      props.pluginName = generatePluginName(props.pluginName);
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('plugin.py'),
      this.destinationPath('plugins/' + this.props.pluginName + '.py')
    );
    this.fs.copy(
      this.templatePath('tests.py'),
      this.destinationPath('tests/test_' + this.props.pluginName + '.py')
    );
  }

  install() {
    this.installDependencies();
  }
};

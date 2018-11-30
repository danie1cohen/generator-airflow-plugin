'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Beep borp beep I am your handy ${chalk.red('Airflow Plugin')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'What are we gonna call this thing?',
        default: 'example_plugin'
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
      }
    ];

    return this.prompt(prompts).then(props => {
      props.pluginObjectName = this._generateObjectName(props.pluginName);
      props.pluginDisplayName = this._generateDisplayName(props.pluginName);
      props.pluginName = this._generatePluginName(props.pluginName);
      this.props = props;
    });
  }

  _generateObjectName(name) {
    var objectName = this._sanitizePluginName(name).split(" ").map(
        w => w.charAt(0).toUpperCase() + w.slice(1)
    ).join("");

    return objectName
  }

  _generateDisplayName(name) {
    var displayName = this._sanitizePluginName(name).split(" ").map(
        w => w.charAt(0).toUpperCase() + w.slice(1)
    ).join(" ");

    return displayName
  }

  _generatePluginName(name) {
    var pluginName = name.split(' ').join('_');

    if ( !pluginName.includes('plugin') ) {
      pluginName = pluginName + '_plugin';
    }

    return pluginName
  }

  _sanitizePluginName(pluginName) {
    var name = pluginName.split('_').join(' ');

    if ( name.includes('plugin') ) {
      name = name.replace('plugin', '').trim();
    }
    name = name.split('  ').join(' ');

    return name
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('plugin.py'),
      this.destinationPath('plugins/' + this.props.pluginName + '.py'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('tests.py'),
      this.destinationPath('tests/test_' + this.props.pluginName + '.py'),
      this.props
    );
  }

  install() {
    // this.installDependencies();
  }
};

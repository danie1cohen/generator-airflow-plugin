'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

var generatorDir = path.join(__dirname, '../generators/app');

describe('generator-airflow-plugin:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        pluginName: 'test',
        createOperator: true,
        createHook: true,
        createExecutor: true,
        createView: true,
        createBlueprint: true,
        createMenuLink: true
      });
  });

  //it('creates files', () => {
  //  assert.file(['plugins/test_plugin.py']);
  //  assert.file(['tests/test_test_plugin.py']);
  //});

  it('creates a well formed plugin name', () => {
    let gen = helpers.createGenerator(generatorDir, []);
    let pluginName = gen._generatePluginName('test');
    expect(pluginName).toEqual('test_plugin');
  });

  it("doesn't mess with an already well formed plugin name", () => {
    let gen = helpers.createGenerator(generatorDir, []);
    expect(gen._generatePluginName('test_plugin')).toBe('test_plugin');
  });

  it("creates a python object name in camelcase", () => {
    let gen = helpers.createGenerator(generatorDir, []);
    expect(gen._generateObjectName('test plugin thing_stuff')).toBe('TestThingStuff');
  });

  it("creates a human readable display name", () => {
    let gen = helpers.createGenerator(generatorDir, []);
    expect(gen._generateDisplayName('test_plugin thing_stuff')).toBe('Test Thing Stuff');
  });
});

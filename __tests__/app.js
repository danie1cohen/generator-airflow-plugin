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

  it('creates files', () => {
    assert.file(['test_plugin.py']);
  });

  describe('sets name values', () => {
    it('creates a well formed plugin name', () => {
      let gen = helpers.createGenerator(generatorDir, []);
      expect(gen.generatePluginName('test'), 'test_plugin');
    });

    it("doesn't mess with an already well formed plugin name", () => {
      let gen = helpers.createGenerator(generatorDir, []);
      expect(gen.generatePluginName('test_plugin'), 'test_plugin');
    });

    it("creates a python object name in camelcase", () => {
      let gen = helpers.createGenerator(generatorDir, []);
      expect(gen.generateObjectName('test plugin thing_stuff'), 'TestThingStuff');
    });

    it("creates a human readable display name", () => {
      let gen = helpers.createGenerator(generatorDir, []);
      expect(gen.generateObjectName('test_plugin thing_stuff'), 'Test Thing Stuff');
    });
  })
});

'use strict';
var yeoman = require('yeoman-generator');
var json = require('comment-json');

function getAppJsonObject(me) {
  var scannedFolder = me.destinationRoot();
  var scannedFolderUnix = me.destinationRoot();
  for (var i = 0; i <= 50; i++) { // as we don't want to load many deps lets just scan 50 levels up
    if (me.fs.exists(scannedFolder + '\\app.json')) {
      var parsedAppJson = json.parse(me.fs.read(scannedFolder + '\\app.json'), null, true);
      parsedAppJson.levelsUp = i;
      return parsedAppJson;
    }
    if (me.fs.exists(scannedFolderUnix + '/app.json')) {
      var parsedAppJson = json.parse(me.fs.read(scannedFolderUnix + '/app.json'), null, true);
      parsedAppJson.levelsUp = i;
      return parsedAppJson;
    }
    scannedFolder = scannedFolder + '\\..';
    scannedFolderUnix = scannedFolderUnix + '/..';
  }
  me.env.error('Was searching painstakingly for an app.json file which defines important app config, but didn\'t find any. Sorry, I cannot continue :c');
}

function extractPackages(appConfig, me) {
  var pathRoot = me.destinationRoot();
  pathRoot = pathRoot.replace(/\\\\/g, ':!');
  pathRoot = pathRoot.replace(/\\/g, ':!');
  pathRoot = pathRoot.replace(/\//g, ':!');
  var packages = pathRoot.split(':!');
  if (appConfig.levelsUp < 2) {
    packages = [];
  } else {
    packages = packages.slice((-1 * appConfig.levelsUp) + 1);
  }
  packages.unshift(appConfig.name);
  return packages;
}

function composeViewContents(props) {
  var viewRequires = 'requires: [';
  var viewBody = '';
  if (props.controllerName) {
    viewRequires = viewRequires.concat('\n         \'' + props.namespace + '.controller.' + props.controllerName + '\',');
    viewBody = viewBody.concat('\n    controller: \'' + props.controllerName.decapitalize() + '\',');
  }
  if (props.storeName && !props.viewModelName) {
    viewRequires = viewRequires.concat('\n         \'' + props.namespace + '.store.' + props.storeName + '\',');
    viewBody = viewBody.concat('\n    store {\n        type: { : \'' + props.storeName.decapitalize() + '\' }\n    },');
  }
  if (props.viewModelName) {
    viewRequires = viewRequires.concat('\n         \'' + props.namespace + '.viewmodel.' + props.viewModelName + '\',');
    viewBody = viewBody.concat('\n    viewModel: {\n        type: \'' + props.viewModelName.decapitalize() + '\'\n    },');
    if (props.storeName) {
      viewBody = viewBody.concat('\n    ' + 'bind: {\n        store: \'' + props.storeName.decapitalize() + '\'\n    },');
    }
  }
  if (!viewRequires.endsWith('[')) {
    viewRequires = viewRequires.slice(0, -1);
  }
  viewRequires = viewRequires.concat('\n   ],');
  props.viewRequires = viewRequires;
  props.viewBody = viewBody;
}

function composeControllerContents(props) {

}

module.exports = yeoman.Base.extend({
  prompting: function () {
    String.prototype.decapitalize = function() {
      return this.charAt(0).toLowerCase() + this.slice(1);
    };

    var appConfig = getAppJsonObject(this);
    var packagesArray = extractPackages(appConfig, this);

    this.log('Welcome to ExtJS module generator. Report any bugs at piotr.napadlek@gmail.com');
    this.log('Please provide some info to scaffold ready-to-go module!');

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the module? Please use UpperCamelCase, as you would declare ExtJS class name. It will be converted automatically.\n' +
      'Eg. \'NewModule\' will create a module folder named \'newmodule\' with a main/view directory containing file \'NewModule.js\'\n' +
      'Default: ',
      default: 'NewModule'
    }, {
      type: 'checkbox',
      name: 'generatedItems',
      message: 'Which elements you would like to generate?',
      choices: ['View', 'ViewModel', 'Controller', 'Store', 'Model'],
      default: ['View', 'ViewModel', 'Controller', 'Store', 'Model']
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('View') >= 0;
      },
      type: 'list',
      name: 'viewExtend',
      message: 'Which ExtJS class should the View extend?',
      choices: [
        'Ext.Component',
        'Ext.container.Container',
        'Ext.panel.Panel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.tree.Panel',
        'Ext.window.Window',
        'Other'],
      default: 'Ext.panel.Panel',
      store: true
    }, {
      when: function (response) {
        return response.viewExtend === 'Other';
      },
      type: 'Input',
      name: 'viewExtend',
      message: 'Which one then?',
      default: 'Ext.Component'
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('View') >= 0;
      },
      type: 'input',
      name: 'viewName',
      message: 'Which name should the View have?',
      default: function(response) {
        return response.moduleName;
      }
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('View') >= 0;
      },
      type: 'input',
      name: 'viewXType',
      message: 'Would you like to provide an xtype for the View?',
      default: function(response) {
        return response.viewName.decapitalize();
      }
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('ViewModel') >= 0;
      },
      type: 'input',
      name: 'viewModelName',
      message: 'Which name should the ViewModel have?',
      default: function(response) {
        return response.moduleName.concat('ViewModel');
      }
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('Controller') >= 0;
      },
      type: 'input',
      name: 'controllerName',
      message: 'Which name should the Controller have?',
      default: function(response) {
        return response.moduleName.concat('Controller');
      }
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('Store') >= 0;
      },
      type: 'input',
      name: 'storeName',
      message: 'Which name should the Store have?',
      default: function(response) {
        return response.moduleName.concat('Store');
      }
    }, {
      when: function (response) {
        return response.generatedItems.indexOf('Model') >= 0;
      },
      type: 'input',
      name: 'modelName',
      message: 'Which name should the Model have?',
      default: function(response) {
        return response.moduleName.concat('Model');
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.appName = appConfig.name;
      this.props.package = props.moduleName.toLowerCase();
      packagesArray.push(this.props.package);
      packagesArray.push('main');
      this.props.namespace = packagesArray.join('.');
      composeViewContents(this.props);
    }.bind(this));
  },

  writing: function () {
    if (this.props.viewName) {
      this.fs.copyTpl(
        this.templatePath('View.js'),
        this.destinationPath(this.props.package + '/main/view/'+ this.props.viewName + '.js'),
        this.props
      );
    }
    if (this.props.viewModelName) {
      this.fs.copyTpl(
        this.templatePath('ViewModel.js'),
        this.destinationPath(this.props.package + '/main/viewmodel/'+ this.props.viewModelName + '.js'),
        this.props
      );
    }
    if (this.props.controllerName) {
      this.fs.copyTpl(
        this.templatePath('Controller.js'),
        this.destinationPath(this.props.package + '/main/controller/'+ this.props.controllerName + '.js'),
        this.props
      );
    }
    if (this.props.storeName) {
      this.fs.copyTpl(
        this.templatePath('Store.js'),
        this.destinationPath(this.props.package + '/main/store/'+ this.props.viewName + '.js'),
        this.props
      );
    }
    if (this.props.modelName) {
      this.fs.copyTpl(
        this.templatePath('Model.js'),
        this.destinationPath(this.props.package + '/main/model/'+ this.props.modelName + '.js'),
        this.props
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});

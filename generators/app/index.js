'use strict';
var yeoman = require('yeoman-generator');
var json = require('comment-json');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var lvlsUp = 0;
    var appJson = function (me) {
      var scannedFolder = me.destinationRoot();
      for (var i = 0; i <= 50; i++) { // as we don't want to load many deps lets just scan 50 levels up
        if (me.fs.exists(scannedFolder + '\\app.json')) {
          lvlsUp = i - 1;
          return json.parse(me.fs.read(scannedFolder + '\\app.json'), null, true);
        }
        scannedFolder = scannedFolder + '\\..';
      }
      me.env.error('Was searching painstakingly for an app.json file defining important app config, but didn\'t find any. Sorry, I cannot continue :c');
    };
    var appConfig = appJson(this);
    var packageName = (function (me) {
      var pathRoot = me.destinationRoot();
      pathRoot = pathRoot.replace('\\', '.');
      pathRoot = pathRoot.replace('\\\\', '.');
      pathRoot = pathRoot.replace('/', '.');
      var packages = pathRoot.split('.');
      if (lvlsUp < 0) {
        packages = [];
      } else {
        packages.slice(-1 * lvlsUp);
      }
      me.log(packages);
    })(this);

    this.log('Welcome to ExtJS module generator. Report any bugs at piotr.napadlek@gmail.com');
    this.log('Please provide some info to scaffold ready-to-go module!');
    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the module? Please use camelcase, as you would declare ExtJS class name. It will be converted automatically.\n' +
      'Eg. \'NewModule\' will create a module folder named \'newmodule\' with a view directory containing file \'NewModule.js\''
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  },

  install: function () {
    //this.installDependencies();
  }
});

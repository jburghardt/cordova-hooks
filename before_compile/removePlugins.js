#!/usr/bin/env node

// http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/
// removes specific plugins before build is compiled.
// comes in handy if we dont want certain plugins to be delivered in final product

var pluginlist = [
  //  "cordova-plugin-testplugin",
];

var target = "development";
if (process.env.TARGET) {
  target = process.env.TARGET;
}

if (target === 'production') {

  console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("!! Removing plugins based on Environment: " + target);

  // no need to configure below
  var fs = require('fs');
  var path = require('path');
  var util = require('util')
  var exec = require('child_process').exec;

  pluginlist.forEach(function(plug) {
    console.log("!! Removing plugin:" + plug);
    exec("cordova plugin remove " + plug + " --save");
  });
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

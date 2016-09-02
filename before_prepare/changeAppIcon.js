#!/usr/bin/env node

// devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/
// changes the names of the appicons in the config.xml before projects is prepared
// names should look like: <icon src="resources/Icon-60__ldev.png" height="60" width="60" />
// this way only the last part '__ldev' will be replaced, or deleted if we take production build

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function replace_string_in_file(filename, to_replace, replace_with) {
  var data = fs.readFileSync(filename, 'utf8');
  var result = data.replace(new RegExp(to_replace, "g"), replace_with);
  fs.writeFileSync(filename, result, 'utf8');
}

var target = "development";
if (process.env.TARGET) {
  target = process.env.TARGET;
}

if (rootdir && target !== 'development') {

  console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("!! Changing AppIcon based on Environment: " + target);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  var ourconfigfile = path.join(rootdir, "../project.json");
  var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'));

  var configReplace = [
    "config.xml"
  ];

  configReplace.forEach(function (val, index, array) {
    var fullfilename = path.join(rootdir, val);

    if (fs.existsSync(fullfilename)) {

      replace_string_in_file(fullfilename,"__ldev",configobj[target].appIcon);

    } else {
      console.log("missing: " + fullfilename);
    }
  })
}

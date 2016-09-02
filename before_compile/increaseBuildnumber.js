#!/usr/bin/env node

// http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

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

//	to add jenkins_buil number via env.
//	var BUILD_JENKINS = ".0";
//	if (process.env.BUILD_JENKINS) {
//		BUILD_JENKINS = "."+process.env.BUILD_JENKINS;
//	}

if (rootdir) {

	var d = new Date().toISOString();
	var buildnumber = d.slice(0, 4) + d.slice(5, 7) + d.slice(8, 10) +
	d.slice(11, 13) + d.slice(14, 16) + d.slice(17, 19);

	var buildstoreplace = [
		// ios
		"platforms/ios/myProject/config.xml",
		"platforms/ios/myProject/myProject.plist",
		//android
		"platforms/android/AndroidManifest.xml",
		"platforms/android/res/xml/config.xml",
	];

	filestoreplace.forEach(function(val, index, array) {

		var fullfilename = path.join(rootdir, val);

		if (fs.existsSync(fullfilename)) {

			replace_string_in_file(fullfilename, "BUILD_NUMBER", buildnumber);
			
		} else {
			console.log("missing: "+fullfilename);
		}
	});

	console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	console.log('Build number updated to ' + buildnumber);
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

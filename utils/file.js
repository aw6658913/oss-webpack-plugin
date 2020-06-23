'use strict';
var fs = require('fs');
var path = require('path');

exports.eachFileSync = function(dir, callback) {
	const files = fs.readdirSync(path.resolve(dir));
	if (files && files.length) {
		for ( var i=0;i<files.length;i++){
			const file = fs.createReadStream(path.resolve(dir,files[i]));
			callback({file: file, fileName: files[i]});
		}
	}
}


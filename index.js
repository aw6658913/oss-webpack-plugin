'use strict';
var path = require('path');
var fs = require('fs');
var co = require('co');
var fileUtils = require('./utils/file')
var _ = require('./utils/object')
var request = require('request');
var color = require('color');


function AliyunossWebpackPlugin(options) {
	if (!options || !options.buildPath || !options.uploadUrl) {
		console.info('Some parameters of the problem，please set as the follow:')
		console.info(" new".red + " AliyunossWebpackPlugin({");
		console.info("   buildPath:'your path',".yellow);
		console.info("   uploadUrl:'your upload url',".yellow);
		console.info(" })");
		throw new Error('Some parameters of the problem')
	}
	this.fileArray = [];
	this.options = _.extend({

	}, options);
}

AliyunossWebpackPlugin.prototype.apply = function(compiler) {
	var _this = this;
	if (compiler) {
		compiler.plugin("done", function(compilation) {
			_this.oposs();
		});
	} else {
		_this.oposs();
	}
};

AliyunossWebpackPlugin.prototype.oposs = function() {
	var _this = this;
	var deleteAll = _this.options.deleteAll || false;
	var generateObjectPath = _this.options.generateObjectPath || function(fileName) {
		return fileName;
	}
	var getObjectHeaders = _this.options.getObjectHeaders || function() {
		return {};
	}

	co(function*() {
		'use strict';

		//上传oss的新代码
		fileUtils.eachFileSync(_this.options.buildPath, function(file) {
			_this.fileArray.push(file);
		});

		var upload = async (file) => {
			var formData = {
				folder: _this.options.outputPath || '',
				filename: file.file
			}
			await request({
				url: _this.options.uploadUrl,
				method: 'POST',
				formData,
				headers : { 'Content-Type' : 'multipart/form-data' }
			});
			console.log(file.fileName + ' -- upload to ' + ' success');
		}

		var j = 0;
		for (var i = 0; i < _this.fileArray.length; i++) {
			var file = _this.fileArray[i];
			if (file.file) {
				upload(file);
			} else {
				console.log('skipping file ' + file.fileName)
			}
		}
	}).catch(function(err) {
		console.info(err)
	})
}


module.exports = AliyunossWebpackPlugin;
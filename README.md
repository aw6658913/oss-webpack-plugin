##oss-webpack-plugin
webpack的插件，用于自动上传静态资源到阿里的oss上，以便作为静态资源使用，需要搭配后台才可使用，该插件仅作为客户端。  

Installation
------------
Install the plugin with npm:
```shell
$ npm i oss-webpack-plugin --D
```

Basic Usage
-----------

add the plugin to your webpack config as follows:

```javascript
var AliyunossWebpackPlugin = require('oss-webpack-plugin')
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new AliyunossWebpackPlugin({
    buildPath:'your build path',
    uploadUrl: 'your upload url',
    outputPath: 'your output path'
  })]
}
```   

don't depend webpack,just as follows:
```javascript
var AliyunossWebpackPlugin = require('oss-webpack-plugin')
var oss = new AliyunossWebpackPlugin({
    buildPath:'your build path',
    uploadUrl: 'your upload url',
    outputPath: 'your output path'
});
oss.apply()
```     

Configuration
-------------
The plugin allowed values are as follows:

- `buildPath`: 需要上传的文件路径,支持整个文件夹的遍历。
- `uploadUrl`: 上传资源的请求地址。
- `outputPath`: oss目标路径
- `deleteAll`: 先删除oss上的代码之后再上传，默认为false

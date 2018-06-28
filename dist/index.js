#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _optimist = require('optimist');

var _easyMockServer = require('./easyMockServer');

var _easyMockServer2 = _interopRequireDefault(_easyMockServer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option("-p, --port <string>", "Server port").option("-b, --basePath <string>", "File path base on process.cwd()");

_commander2.default.parse(process.argv);

var configs = {
    basePath: _commander2.default.basePath ? _path2.default.resolve(process.cwd(), _commander2.default.basePath) : process.cwd(),
    port: _commander2.default.port ? _commander2.default.port : 8124
};

var server = new _easyMockServer2.default(configs);
server.start();
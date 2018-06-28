'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EasyMockServer = function () {
    function EasyMockServer(configs) {
        _classCallCheck(this, EasyMockServer);

        this.basePath = configs.basePath;
        this.port = configs.port;
    }

    _createClass(EasyMockServer, [{
        key: 'start',
        value: function start() {
            var _this = this;

            _http2.default.createServer(function (req, res) {
                var jsonPath = _path2.default.resolve(_this.basePath, '.' + _url2.default.parse(req.url).pathname + '.json');
                var tempPath = _path2.default.resolve(_this.basePath, '.' + _url2.default.parse(req.url).pathname + '.template');
                if (_fs2.default.existsSync(jsonPath)) {
                    _this.responseFile(jsonPath, req, res, function (data) {
                        return data;
                    });
                } else if (_fs2.default.existsSync(tempPath)) {
                    _this.responseFile(tempPath, req, res, function (data) {
                        return JSON.stringify(_mockjs2.default.mock(JSON.parse(data)));
                    });
                } else {
                    console.log('ERROR:  ' + jsonPath + ' OR ' + tempPath + ' NOT FOUND');
                    _this.sendError(res);
                }
            }).listen(this.port);
            console.log('Server running on port:' + this.port);
        }
    }, {
        key: 'responseFile',
        value: function responseFile(filePath, request, response, fileHandler) {
            var _this2 = this;

            _fs2.default.readFile(filePath, 'utf-8', function (err, data) {
                if (err) {
                    console.log('ERROR:  ' + 'READ ' + filePath + ' ERROR');
                    _this2.sendError(response);
                } else {
                    console.log('SUCCESS:  ' + request.url + ' --> ' + filePath);
                    _this2.sendSuccess(fileHandler(data), request, response);
                }
            });
        }
    }, {
        key: 'sendSuccess',
        value: function sendSuccess(data, request, response) {
            response.writeHead(200, {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': request.headers.origin ? request.headers.origin : '*',
                'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            response.end(data);
        }
    }, {
        key: 'sendError',
        value: function sendError(response) {
            response.writeHead(404);
            response.end("404");
        }
    }]);

    return EasyMockServer;
}();

module.exports = EasyMockServer;
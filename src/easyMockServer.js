import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import mock from 'mockjs';

class EasyMockServer {

    constructor(configs) {
        this.basePath = configs.basePath;
        this.port = configs.port;
    }

    start() {
        http.createServer((req, res) => {
            const jsonPath = path.resolve(this.basePath, '.' + url.parse(req.url).pathname + '.json');
            const tempPath = path.resolve(this.basePath, '.' + url.parse(req.url).pathname + '.template');
            if (fs.existsSync(jsonPath)) {
                this.responseFile(jsonPath, req, res, function (data) {
                    return data;
                });
            } else if (fs.existsSync(tempPath)) {
                this.responseFile(tempPath, req, res, function (data) {
                    return JSON.stringify(mock.mock(JSON.parse(data)));
                });
            } else {
                console.log('ERROR:  ' + jsonPath + ' OR ' + tempPath + ' NOT FOUND');
                this.sendError(res);
            }
        }).listen(this.port);
        console.log('Server running on port:' + this.port);
    }

    responseFile(filePath, request, response, fileHandler) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log('ERROR:  ' + 'READ ' + filePath + ' ERROR');
                this.sendError(response);
            } else {
                console.log('SUCCESS:  ' + request.url + ' --> ' + filePath);
                this.sendSuccess(fileHandler(data), request, response);
            }
        });
    }

    sendSuccess(data, request, response) {
        response.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': request.headers.origin ? request.headers.origin : '*',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        response.end(data);
    }

    sendError(response) {
        response.writeHead(404);
        response.end("404");
    }
}

module.exports = EasyMockServer;
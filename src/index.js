#!/usr/bin/env node

import program from 'commander';
import {argv} from 'optimist';
import EasyMockServer from './easyMockServer';
import path from 'path';


program
    .option("-p, --port <string>", "Server port")
    .option("-b, --basePath <string>", "File path base on process.cwd()")
    .option("-l, --lag <string>", "Response lag");

program.parse(process.argv);

const configs = {
    basePath: program.basePath ? path.resolve(process.cwd(), program.basePath) : process.cwd(),
    port: program.port ? program.port : 8124,
    lag: program.lag ? program.lag : 0,
};

const server = new EasyMockServer(configs);
server.start();
#!/usr/bin/env node
var program = require('commander');
var src = require('../src')
program.version('1.0.1').usage('<command> [options]')

program.command('init <name>').description('init pixi game project').action(src.init)

program.parse(process.argv)

module.exports = program

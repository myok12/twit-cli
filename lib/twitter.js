#!/usr/bin/env node
"use strict";
var path = require("path");
var VERSION = require(path.join("..", "package.json")).version;
var globals = require(path.join(__dirname, "globals"));
var program = require("commander");
var fs = require("fs");

try {
    var HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
    var config = fs.readFileSync(path.join(HOME, ".twit-cli"), "UTF8");
    globals.configTwitter(JSON.parse(config));
} catch (err) {
    logger.error(err.message);
    // TODO prompt to set up dot file
}

program.version(VERSION)
    .option("-j, --json", "Get response as JSON")
    .option("-v, --verbose", "Verbose logging");

// Setup commands
var cmdsPath = path.join(__dirname, "commands"),
    commands = fs.readdirSync(cmdsPath);

// Load commands
commands.forEach(function(cmd) {
    require(path.join(cmdsPath, cmd))(program);
});

program.parse(process.argv);

if (program.verbose) logger.canVerbose = true;
if (program.json) logger.canJSON = true;

"use strict";
var colors = require("colors");

colors.setTheme({
    info: "green",
    warn: "yellow",
    error: "red",
    verbose: "cyan",
    json: "grey",
    data: "grey",
    help: "cyan",
    prompt: "grey",
    silly: "rainbow"
});

var urlRgx = /http:\/\/[\d\w_\.\/]+/g;
var hashRgx = /#[\d\w_]+/g;
var handleRgx = /@[^\s]+/g;

function Logger() {
    this.canVerbose = false;
    this.canJSON = false;
}

var __slice = Array.prototype.slice;
Logger.prototype = {
    log: function () {
        console.log.apply(console, this._colorize(arguments, "info"));
    },
    verbose: function () {
        if (this.canVerbose) {
            console.log.apply(console, this._colorize(arguments, "verbose"));
        }
    },
    json: function () {
        if (this.canJSON) {
            console.log.apply(console, this._colorize(arguments, "json"));
        }
    },
    warn: function () {
        console.warn.apply(console, this._colorize(arguments, "warn"));
    },
    error: function () {
        console.error.apply(console, this._colorize(arguments, "error"));
    },
    tweet: function (screenName, text) {
        screenName = screenName.info;
        text = text.white;

        // Give url colors
        text = text.replace(urlRgx, function (text) {
            return text.yellow;
        });

        // colorize hash tags
        text = text.replace(hashRgx, function (text) {
            return text.grey;
        });
        // colorize twitter handles
        text = text.replace(handleRgx, function (text) {
            return text.cyan;
        });

        console.log("@" + screenName + ": " + text);
    },
    _colorize: function (args, color) {
        args = __slice.call(args);
        return args.map(function(arg) {
            if (typeof arg === "string") {
                return arg[color];
            }
            return arg;
        });
    }
};

module.exports = Logger;

"use strict";


var colors = require("colors");

colors.setTheme({
    info: "green",
    warn: "yellow",
    error: "red",
    verbose: "cyan",
    data: "grey",
    help: "cyan",
    prompt: "grey",
    tweet: "blue",
    silly: "rainbow"
});

function Logger() {
    Object.defineProperties(this, {
        colors: {
            value: true,
            writable: true,
            enumerable: true
        },
        verbose: {
            value: false,
            writable: true,
            enumerable: true
        }
    });
}
var __slice = Array.prototype.slice;
Logger.prototype = {
    log: function () {
        console.log.apply(console, this._colorize(arguments, "info"));
    },
    verbose: function () {
        if (this.verbose) {
            console.log.apply(console, this._colorize(arguments, "verbose"));
        }
    },
    warn: function () {
        console.warn.apply(console, this._colorize(arguments, "warn"));
    },
    error: function () {
        console.error.apply(console, this._colorize(arguments, "error"));
    },
    _colorize: function (args, color) {
        args = __slice.call(args);
        return args.map(function(arg) {
            if (typeof arg == "string") {
                return arg[color];
            }
            return arg;
        });
    }
};

module.exports = Logger;

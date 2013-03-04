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

function Logger() {
    Object.defineProperties(this, {
        colors: {
            value: true,
            writable: true,
            enumerable: true
        },
        canVerbose: {
            value: false,
            writable: true,
            enumerable: true
        },
        canJSON: {
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

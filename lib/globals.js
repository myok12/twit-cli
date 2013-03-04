"use strict";
// non writable global objects

var path = require("path"),
    Logger = require(path.join(__dirname, "logger"));

Object.defineProperties(GLOBAL, {
    assert: {
        value: require("assert"),
        writable: false,
        configurable: false,
        enumerable: true
    },
    path: {
        value: path,
        writable: false,
        configurable: false,
        enumerable: true
    },
    logger: {
        value: new Logger(),
        writable: false,
        configurable: false,
        enumerable: true
    }
});

var Twitter = require(path.join(__dirname, "twitter-api"));

module.exports = {
    configTwitter: function (config) {
        try {
            Object.defineProperty(GLOBAL, "twitter", {
                value: new Twitter(config),
                writable: false,
                configurable: false,
                enumerable: true
            });
        } catch (err) {
            logger.error(err);
            process.exit(1);
        }
    }
};



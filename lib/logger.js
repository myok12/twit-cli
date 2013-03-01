"use strict";


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

Logger.prototype = {
    log: function () {
        console.log.apply(console, arguments);
    },
    verbose: function () {
        if (this.verbose) {
            this.log.apply(this, arguments);
        }
    }
};

module.exports = Logger;

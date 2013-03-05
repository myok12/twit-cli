"use strict";

var fs = require("fs"),
    path = require("path"),
    crypto = require("crypto");

var dir = path.join(__dirname, "..", ".cache");

function Cache(ttl) {
    if (typeof ttl !== "number") throw new Error("ttl must be a number");
    this.ttl = ttl;

    if (!(fs.existsSync(dir) && fs.statSync(dir).isDirectory())) {
        fs.mkdirSync(dir);
    }
}

Cache.prototype = {
    _makeHash: function (arg) {
        return crypto.createHash("md5")
            .update(JSON.stringify(arg))
            .digest("hex");
    },

    put: function (key, val) {
        var hash = this._makeHash(key);

        var cache = {
            ttl: new Date(Date.now() + this.ttl),
            data: val
        };

        var filepath = path.join(dir, hash);
        fs.writeFileSync(filepath, JSON.stringify(cache), "UTF8");
    },

    get: function (key) {
        var hash = this._makeHash(key),
            filepath = path.join(dir, hash);

        if (!fs.existsSync(filepath)) return;

        var cache = JSON.parse(fs.readFileSync(filepath));

        if (new Date(cache.ttl) - new Date() <= 0) return this.del(key);

        return cache.data;
    },

    del: function (key) {
        var hash = this._makeHash(key),
            filepath = path.join(dir, hash);

        if (!fs.existsSync(filepath)) return;
        fs.unlinkSync(filepath);
    }
};

Cache.clean = function () {
    // Cleans all cache files
    if (fs.existsSync(dir)) {
        var files = fs.readdirSync(dir);
        files.forEach(function (file) {
            fs.unlinkSync(path.join(dir, file));
        });
    }
};

module.exports = Cache;

"use strict";
// Util Modules
var path = require("path");
var globals = require(path.join("..", "lib", "globals"));

// APIs
var TwitterApi = require("twit"),
    Twitter = require(path.join("..", "lib", "twitter-api"));

// Test tools
var sinon = require("sinon"),
    should = require("should");

// JSON fixtures
var statusUpdateJSON = require(path.join(__dirname, "fixtures", "status-update.json"));

describe("Twitter instantiation", function () {
    it("should throw an error if no config is provided", function () {
        (function () {
            new Twitter();
        }).should.throw();
    });
});

describe("Methods", function () {
    // Because the constructor over `TwitterApi` can't be stubbed, 
    // I use a dummy class that has the prototype to get around errors thrown

    function StubApi() {}
    StubApi.prototype = TwitterApi.prototype;

    function StubTwitter() {
        this.api = new StubApi();
    }
    StubTwitter.prototype = Twitter.prototype

    beforeEach(function () {
        this.twitter = new StubTwitter();
    });

    describe("tweet", function () {
        sinon.stub(StubApi.prototype, "post", function (path, param, fn) {
            fn(null, statusUpdateJSON);
        });

        it("should reply with a tweet object", function (done) {
            this.twitter.tweet("Derp!", function (err, tweet) {
                tweet.id.should.equal(statusUpdateJSON.id);
                tweet.user.id.should.equal(statusUpdateJSON.user.id);
                tweet.created_at.should.be.instanceOf(Date);
                done(err);

                StubApi.prototype.post.restore();
            });
        });
    })
});

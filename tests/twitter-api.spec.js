"use strict";
// Util Modules
var path = require("path");
var globals = require(path.join("..", "lib", "globals"));

// APIs
var TwitterApi = require("twit"),
    Twitter = require(path.join("..", "lib", "twitter-api"));

// Test tools
var sinon = require("sinon"),
    should = require("should"),
    Cache = require("fscache");

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
        this.cache = Cache.createSync(1000 * 30, path.join(__dirname, ".cache"));
    }
    StubTwitter.prototype = Twitter.prototype;

    beforeEach(function () {
        this.twitter = new StubTwitter();
    });

    afterEach(function () {
        this.twitter.cache.cleanSync();
    });

    describe("tweeting", function () {
        var json = require(path.join(__dirname, "fixtures", "status-update.json"));
        beforeEach(function () {
            sinon.stub(StubApi.prototype, "post", function (path, param, fn) {
                fn(null, json);
            });
        });

        afterEach(function () {
            StubApi.prototype.post.restore();
        });

        it("should respond with a tweet object after tweeting", function (done) {
            this.twitter.tweet("Derp!", function (err, tweet) {
                tweet.id.should.equal(json.id);
                tweet.user.id.should.equal(json.user.id);
                tweet.created_at.should.be.instanceOf(Date);
                done(err);
            });
        });

        xit("should respond with a tweet object after replying", function (done) {
            this.twitter.tweet("Derp! @derp", 123123, function (err, tweet) {
                tweet.id.should.equal(json.id);
                tweet.user.id.should.equal(json.user.id);
                tweet.created_at.should.be.instanceOf(Date);
                done(err);
            });
        });

        xit("should respond with an error object after replying without a screenname", function (done) {
            this.twitter.tweet("Derp!", 123123, function (err, tweet) {
                err.should.be.instanceOf(Error)
                done();
            });
        });

        it("should respond with a tweet object after deleting", function (done) {
            this.twitter.remove(1231231231, function (err, tweet) {
                tweet.id.should.equal(json.id);
                tweet.user.id.should.equal(json.user.id);
                tweet.created_at.should.be.instanceOf(Date);
                done(err);
            });
        });
    });

    describe("getTimeline", function () {
        it("should reply with tweets", function (done) {
            var json = require(path.join(__dirname, "fixtures", "timeline.json"));
            sinon.stub(StubApi.prototype, "get", function (path, param, fn) {
                fn(null, json);
            });

            this.twitter.getTimeline(function (err, tweets) {
                tweets.length.should.be.above(0);
                done(err);

                StubApi.prototype.get.restore();
            });
        });
    })
});

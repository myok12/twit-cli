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
    Cache = require(path.join("..", "lib", "cache"));

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
        this.cache = new Cache(1000 * 30);
    }
    StubTwitter.prototype = Twitter.prototype;

    beforeEach(function () {
        this.twitter = new StubTwitter();
    });

    afterEach(function () {
        Cache.clean();
    });

    describe("tweet", function () {
        var json = require(path.join(__dirname, "fixtures", "status-update.json"));
        sinon.stub(StubApi.prototype, "post", function (path, param, fn) {
            fn(null, json);
        });

        it("should reply with a tweet object", function (done) {
            this.twitter.tweet("Derp!", function (err, tweet) {
                tweet.id.should.equal(json.id);
                tweet.user.id.should.equal(json.user.id);
                tweet.created_at.should.be.instanceOf(Date);
                done(err);

                StubApi.prototype.post.restore();
            });
        });
    })

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

/*
 * @module twitter-api
 * @desc Normalize data that comes from twitter for easier mangling
 */
"use strict";

var TwitterApi = require("twit");

// These classes allow me to normalize some data for logging purposes only
function Tweet(data) {
    this.id = data.id;
    this.text = data.text;
    this.created_at = new Date(data.created_at);
    if (isNaN(this.date)) {
        this.date = new Date();
    }
    this.user = new User(data.user);
    this.retweet_count = data.retweet_count;
    this._raw_ = data;
}

function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.screen_name = data.screen_name;
    this.url = "http://twitter.com/" + this.username;
    this._raw_ = data;
}


/*
function Tweets(data) {
    this.tweets = data.map(function (tweet) {
        return new Tweet(tweet);
    });
}
*/

function TwitterError(err) {
    var self = this;
    try {
        this.message = JSON.parse(err.data).errors[0].message;
    } catch (err) {
        try {
            self.message = JSON.parse(err.twitterReply).errors[0].message;
        } catch (err) {
            self.message = err;
        }
        self.message = err;
    }
}


// The purpose of this Twitter class is to hide
// the core functionality of the twi api and any
// logic under the hood required for a valid twitter
// action. It also normalizes twitter data to fields that
// are easier to remember and discards any cruft.
function Twitter(config) {
    assert(config != null, "Config is required");
    this.api = new TwitterApi(config);
}
Twitter.prototype = {
    tweet: function (str, fn) {
        if (str.length < 1) return fn(new Error("No tweet provided."));
        // Error if text is too long
        // TODO how does twitter count characters???
        this.api.post("statuses/update", { status: str }, function(err, res) {
            if (err) return fn(new TwitterError(err));
            fn(null, new Tweet(res));
        });
    },

    // TODO can include retweets, etc?
    // TODO where to specify number of tweets
    getTimeline: function (limit, fn) {
        // Limit will default 1
        if (typeof limit !== "number") {
            limit = parseInt(limit, 10);
            if (isNaN(limit)) {
                limit = 1;
            }
        }
        fn();
    }
};

module.exports = Twitter;

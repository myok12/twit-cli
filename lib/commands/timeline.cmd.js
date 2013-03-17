"use strict";
var moment = require("moment");

// TODO regex url to diff color and hashes to diff color
// make logger.tweet automatically do this

// The `timeline` command
module.exports = function (program) {
    program
        .command("timeline [screenname]")
        .description("Get timeline data")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .option("-l, --limit [integer]", "Number of statuses to return", parseInt)
        .option("-r, --rt", "Show retweets [screenname required]")
        .option("-i, --include", "Include replies")
        .action(function(screenName, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            twitter.getTimeline({
                screenName: screenName,

                limit: opts.limit,
                showRetweets: opts.rt,
                excludeReplies: !opts.include
            }, function (err, tweets) {
                if (err) return logger.error(err.message || err);

                logger.json(tweets._raw_);

                tweets.forEach(function (tweet) {
                    console.log((moment(tweet.created_at).format("MMM D, YYYY @ H:mm a").data), "\r");
                    console.log(("#RT: " + tweet.retweet_count).data, "\r");
                    console.log(("TweetID: ").data + (tweet.id_str + "").cyan, "\r");
                    console.log(("UserID: ").data + (tweet.user.id + "").cyan, "\r");
                    logger.tweet(tweet.user.screen_name, tweet.text);
                    console.log("\n");
                });
            });
        });
};

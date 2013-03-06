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
            twitter.getTimeline({
                screenName: screenName,
                limit: opts.limit,
                showRetweets: opts.rt,
                excludeReplies: !opts.include
            }, function (err, tweets) {
                if (err) {
                    logger.error(err.message || err);
                    return;
                }
                logger.json(tweets._raw_);

                tweets.forEach(function (tweet) {
                    logger.verbose("TweetID: " + tweet.id, "\r");
                    logger.verbose("UserID: " + tweet.user.id, "\r");
                    console.log((moment(tweet.created_at).format("MMM D, YYYY @ H:mm a").data), "\r");
                    console.log(("#RT: " + tweet.retweet_count).data, "\r");
                    logger.tweet(tweet.user.screen_name, tweet.text);
                    console.log("\n");
                });
            });
        });
};

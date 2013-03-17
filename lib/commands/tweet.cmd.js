"use strict";

// The `tweet` command
module.exports = function (program) {
    program
        .command("tweet <status>")
        .description("140 character message.")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .option("-c, --count", "Count characters in Tweet (will not send)")
        //.option("-r, --reply [n]", "The id of the tweet you want to reply too. The users screenname MUST be included in the tweet.", Number)
        .action(function(msg, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            if (opts.count) return logger.log("# Chars: " + msg.length);
            twitter.tweet(msg, opts.reply, function (err, tweet) {
                if (err) return logger.error(err.message || err);

                logger.json(tweet._raw_);
                logger.log("Tweet `" + (tweet.id_str + "").red + "` sent @ " + (tweet.created_at).toString() + ".");
            });
        });
};

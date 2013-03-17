"use strict";

// The `reweet` command
module.exports = function (program) {
    program
        .command("retweet <id>")
        .description("Retweet")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .option("-d, --del", "Delete a retweet")
        .action(function(id, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            twitter.retweet(id, opts.del, function (err, tweet) {
                if (err) return logger.error(err.message || err);
                logger.json(tweet._raw_);

                var sentOrDel = !opts.del ? "sent" : "deleted";
                logger.log("Tweet `" + (tweet.id_str + "").red + "` " + sentOrDel + " @ " + (tweet.created_at).toString() + ".");
            });
        });
};



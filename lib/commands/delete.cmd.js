"use strict";

// The `delete` command
module.exports = function (program) {
    program
        .command("delete <id>")
        .description("Deletes a tweet")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .action(function(id, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            twitter.remove(id, function (err, tweet) {
                if (err) return logger.error(err.message || err);

                logger.json(tweet._raw_);
                logger.log("Tweet `" + (tweet.id + "").red + "` deleted @ " + (tweet.created_at).toString() + ".");
            });
        });
};


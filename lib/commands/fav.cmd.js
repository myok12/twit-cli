"use strict";

// The `favorite` command
module.exports = function (program) {
    program
        .command("fav <id>")
        .description("Favorite a tweet.")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .option("-d, --del", "Delete a favorite")
        .action(function(id, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            twitter.fav(id, opts.del, function (err, tweet) {
                if (err) return logger.error(err.message || err);
                logger.json(tweet._raw_);

                var favOrDel = !opts.del ? "favorited" : "unfavorited";
                logger.log("Tweet `" + (tweet.id_str + "").red + "` has been " + favOrDel + " @ " + (tweet.created_at).toString() + ".");
            });
        });
};

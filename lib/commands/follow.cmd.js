"use strict";

// The `follow` command
module.exports = function (program) {
    program
        .command("follow <user>")
        .description("Follow a user by passing in a screenname or user id.")
        .option("-j, --json", "Get response as JSON")
        .option("-v, --verbose", "Verbose logging")
        .option("-n, --notify", "Receive notifications for this user")
        .action(function(user, opts) {
            if (opts.verbose) logger.canVerbose = true;
            if (opts.json) logger.canJSON = true;

            twitter.follow(user, opts.notify, function (err, user) {
                if (err) return logger.error(err.message || err);
                logger.json(user._raw_);
                logger.log("You are now following " + (user.name + "").red + " (" + (user.screen_name + "").data + ")");
            });
        });
};


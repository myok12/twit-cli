`version: 0.0.1`

> Note: This is the first version of `twit-cli` (duh), so at the moment you can only send tweets. Over the next coming weeks, many new features will be added. This means versions will be updated rapidly. Each new feature will be an uptick. So ready your `npm update` command! On with the `README`...

# Intro
Do you love running applications from the command line? Do you love doing everything with your keyboard? I sure do! If you don't then this tool probably isn't for you. The `twit-cli` tool features all the great things you like to do on twitter, but in the comfort, love, and safety of your terminal.

## Requirements
- [`node js`](http://nodejs.org)
- [`npm`](http://npmjs.org)
- A twitter api account
- A love for the terminal and cli tools

## Getting started
### Install
`npm install twit-cli -g --production`

> Omit the `--production` flag if you would like to run tests.

### Configuration
Create a `.twit-cli` dot file in your **home** directory with the following values that correspond to your Twitter application account. If you haven't created one yet, create it **[here](https://dev.twitter.com/apps)**. In order for `twit-cli` to work, you must set the application to **read, write, and direct messages**. Without that setting, `twit-cli` will fail to work and you will have to using Twitter from some application that is obviously inferior to cli.

#### Example:

```
{
	"consumer_key": "KEYZZZ",
	"consumer_secret": "SECRETZZZ",
	"access_token": "SECRET_KEYZZZZ",
	"access_token_secret": "SECRET_TOKENZZZ"
}
```

## Command Reference

### Getting started
```
Usage: twit-cli [options] [command]

  Commands:

    tweet [options] <status> 140 character message.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### Tweet
```
Usage: tweet [options] <status>

  Options:

    -h, --help     output usage information
    -j, --json     Get response as JSON
    -v, --verbose  Verbose logging
    -c, --count    Count characters in Tweet (will not send)
```

### Timeline

If you choose to omit screenname, the tweets displayed will relate to your timeline.

```
  Usage: timeline [options] [screenname]

  Options:

    -h, --help             output usage information
    -j, --json             Get response as JSON
    -v, --verbose          Verbose logging
    -l, --limit [integer]  Number of statuses to return
    -r, --rt               Show retweets [screenname required]
    -i, --include          Include replies
```
> Note: responses are cached for ~30 sec so rate limit is not exceeded.

## Tests

Test ensure command line args work and retrieve data. To run tests, `clone` this project and type `npm test`.

## Contributers
[Trevor Landau](http://github.com/landau) (Author)

Looking to contribute to this awesome cli action? Please do! See the [contributing wiki](http://).

## Purpose
I created `twit-cli` mostly as an exercise to create a `node.js` cli tool, but also so I could tweet while in my terminal, because who doesn't want to do everything from the CLI.

## Change Log
### 0.0.2
- Success message on tweet
- Ability to retrieve timeline
### 0.0.1
- Supports tweeting


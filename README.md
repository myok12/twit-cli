`version: 0.0.2`

# Intro
Do you love running applications from the command line? Do you love doing everything with your keyboard? I sure do! If you don't then this tool probably isn't for you. The `twit-cli` tool features all the great things you like to do on twitter, but in the comfort, love, and safety of your terminal.

## Requirements
- [`node js`](http://nodejs.org) version >= 0.6.x
- A twitter api account
- A love for the terminal and cli tools

## Getting started
### Install
`npm install twit-cli -g`

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

### List commands

`$ twit-cli -h`

```
Usage: twit-cli [options] [command]

  Commands:

    timeline [options] [screenname] Get timeline data
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
####Examples:

```
twit-cli tweet "I love #twitcli"
twit-cli tweet "I love #twitcli" -c # outputs 15
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

####Examples:
```
twit-cli timeline 
twit-cli timeline -l 5 # 5 tweets returned
twit-cli timeline @trevor_landau 
twit-cli timeline @trevor_landau -l 5 -r 
```

> Note: A command's response is cached for ~30 sec. This is to reduce the likelihood of exceeding Twitter's api rate limit. This only defends against identical commands.


### Follow

```
  Usage: follow [options] <user>

  Options:

    -h, --help     output usage information
    -j, --json     Get response as JSON
    -v, --verbose  Verbose logging
    -n, --notify   Receive notifications for this user
```

####Examples:
```
twit-cli follow @trevor_landau
twit-cli follow @trevor_landau -n
```

### Delete

Delete a tweet

```
  Usage: delete [options] <id>

  Options:

    -h, --help     output usage information
    -j, --json     Get response as JSON
    -v, --verbose  Verbose logging
```

####Examples:
```
twit-cli delete 312382752102154240
```
 
## Tests

Test ensure command line args work and retrieve data. To run tests, `clone` this project and type `npm test`.

> `grunt-cli` required.

## Change Log

### 0.0.4
- Ability to delete and follow

### 0.0.3
- Extracted caching into npm module - [fscache](https://github.com/landau/fscache)

### 0.0.2
- Success message on tweet
- Ability to retrieve timeline

### 0.0.1
- Supports tweeting


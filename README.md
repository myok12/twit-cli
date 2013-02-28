# Intro
Do you love running applications from the command line? Do you love doing everything with your keyboard? I sure do! If you don't then this tool probably isn't for you. The `twitter-cli` tool features all the great things you like to do on twitter, but in the comfort, love, and safety of your terminal.

## Requirements
- [`node js`](http://nodejs.org)
- [`npm`](http://npmjs.org) 
- A twitter api account
- A love for the terminal and cli tools

## Getting started
### Install
`npm install twitter-cli -g`

### Configuration
Create a `.twitter-cli` dot file in your home directory with the following values that correspond to your Twitter dev account. More info [here](http://).

#### Example:

```
{
	"consumer_key": "KEYZZZ",
	"consumer_secret": "SECRETZZZ",
	"access_token_key": "SECRET_KEYZZZZ",
	"access_token_secret": "SECRET_TOKENZZZ"
}
```

## Command Reference

### Tweet

Command: `twitter-cli tweet -m twitter-cli is awesome`

Options:

`-m --message`
	
> Sets the text to be tweeted

### Status
Command: `twitter-cli status`
> Retrieves your latest tweet

Options:

`-n --number`
> Retrieves the last tweets (newest first)

`-j --json`
> Prints tweets in `JSON` form

### Search

## Tests

Test ensure command line args work and retrieve data. To run tests, `clone` this project and type `npm test`.

## Contributers
[Trevor Landau](http://github.com/landau) (Author)

## Purpose
I created `twitter-cli` mostly as an exercise to create a `node js` cli tool, but also so I could tweet while in my terminal. 

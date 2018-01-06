# Lean Coffee

[![Build Status](https://travis-ci.org/nandito/lean_coffee.svg?branch=master)](https://travis-ci.org/nandito/lean_coffee)

_This is a pet project only, not a production ready app, use it on your own risk._

## Summary

According to http://leancoffee.org/
> Lean Coffee is a structured, but agenda-less meeting. Participants gather, build an agenda, and begin talking. Conversations are directed and productive because the agenda for the meeting was democratically generated.

This app is a tool that helps organizing Lean Coffee sessions.

## Technical details

* The backend is hosted on [Graphcool](https://www.graph.cool/)
* The frontend is a [React](https://facebook.github.io/react/) app, that is written in [Typescript](https://www.typescriptlang.org/docs/home.html) and uses
  * [Apollo](http://dev.apollodata.com/react/) as GraphQL client
  * [Semantic UI](http://react.semantic-ui.com/) as a component framework
* Authorization is provided by [Auth0](https://auth0.com/)
* The demo app is hosted on [Surge](http://surge.sh/)
* The continuous integration runs on [Travis CI](https://travis-ci.org/)

### Run the app on localhost

* Clone the project: `$ git clone https://github.com/nandito/lean_coffee.git`
* Go to the directory: `$ cd lean_coffee`
* Switch to develop branch `$ git checkout develop`
* Install dependencies: `$ yarn install` or `$ npm install`
* Run the app: `$ yarn start` or `$ npm start`

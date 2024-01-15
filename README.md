# Full Stack App with React and a REST API

## Description

Treehouse Fullstack JavaScript Techdegree project 10 - Full Stack App with React and a REST API

This project contains two applications. Express REST API project using Sequelize ORM as backend and React App project as frontend API client. These projects are located in the 'api' and 'client' folders respectively.


### Installation

- Use two separate terminals, one for the API and one for the client.
- Both applications require Node.js. If you don't have Node.js installed, install it from [nodejs downloads](https://nodejs.org/en/download/current) by selecting the appropriate version for your operating system.
- From the command line or terminal, install all dependencies for both projects using the `npm install` command.
- The API project uses [SQLite database](https://www.sqlite.org/index.html) for development. Run `npm run seed` to create the database and seed it with data. This command creates the database file `fsjstd-restapi.db`.

## Run App

Use `npm start` command to start applications. The API starts at localhost:5000 and the client starts at localhost:3000

### Testing REST API endpoints

In the root folder of the project is the Postman collection `RESTAPI.postman_collection.json`, which can be imported into the [Postman application](https://www.postman.com/). It can be used to manually test endpoints.
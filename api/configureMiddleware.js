const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const knex = require('../database/dbConfig.js');

const sessionsConfig = {
    secret: 'Secrets',
    name: "cookieMonster",
    resave: "false",
    saveUninitialized: "true",

    store: new KnexSessionStore({
        knex, 
        createtable: true,
        clearInterval: 60000,
        tablename: "sessions",
        sidfiledname: "sid"
    }),

    cookie: {
        maxAge: 600000,
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true
    }
};

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors({origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
}))
server.use(sessions(sessionsConfig))
};


//imports
const express = require('express');
const { logger } = require('./src/util/logger');

//Routers
//TODO
const accountsRouter = require('./src/controller/AccountsRouter');

//create the server on PORT 3000
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Started the server on Port ${PORT}`);
});

//middleware to change body requests to json
app.use(express.json());

//middleware to log incoming requests
app.use((req, res, next) => {
    logger.info(`Incoming ${req.method}: ${req.url}`);
    next();
})

//HTTP Routes: 
//TODO

app.use('/accounts', accountsRouter);

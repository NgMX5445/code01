const express = require('express');
//const { EMPTY_RESULT_ERROR, DUPLICATE_ENTRY_ERROR, TABLE_ALREADY_EXISTS_ERROR } = require('./errors');
const modulesModel = require('./models/modules');

const app = express();
// app.use ,app.post all is route

app.use(express.json()); // to process JSON in request body

app.use(express.static('public'));

app.get('/user', function (req, res, next) {
    return modulesModel
        .getAllUser()
        .then(function (ress) {
            return res.send(ress);
        })
        .catch(function (error) {
            console.error(error);
         
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.post('/modules/table', function (req, res, next) {
    return modulesModel
        .initTable()
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof TABLE_ALREADY_EXISTS_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.post('/modules', function (req, res, next) {
    const code = req.body.code;
    const name = req.body.name;
    const credit = req.body.credit;

    return modulesModel
        .create(code, name, credit)
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof DUPLICATE_ENTRY_ERROR) {
                return res.status(400).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

module.exports = app;
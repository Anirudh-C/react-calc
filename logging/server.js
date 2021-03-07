var express = require('express');
var app = express();

var fs = require('fs');

const {	Validator, ValidationError } = require("express-json-validator-middleware");
const { validate } = new Validator();

function validationErrorMiddleware(error, request, response, next) {
    if (response.headersSent) {
	return next(error);
    }

    const isValidationError = error instanceof ValidationError;
    if (!isValidationError) {
	return next(error);
    }

    response.status(400).json({
	errors: error.validationErrors,
    });

    next();
}

var logSchema = {
    type: "object",
    required: ["time", "name", "input", "message"],
    properties: {
        time: {
            type: "string",
            format: "date-time"
        },
        name: {
            type: "string",
            enum: ["Result", "InputError", "EvalError"]
        },
        input: {
            type: "string"
        },
        message: {
            type: "string"
        }
    }
};

app.use(express.json());
app.get('/logging', (req, res) => {
    res.json({
        message: "Logging service is up and running!"
    });
});

app.post('/logging/log',
         validate({ body : logSchema }),
         (req, res, next) => {
             fs.appendFile(__dirname + '/' + 'logs.json', JSON.stringify(req.body),
                           (err) => {
                               if (err) throw err;
                               console.log("Logged!");
                           });
             res.json({
                 message: "Logged!"
             });

             next();
         });

app.use(validationErrorMiddleware);

app.listen(8081);
"use strict";

exports.dbErrorHandler = error => {
    let message = "Something went wrong";

    if (!error) {
        return message;
    }
 
    if (error.message) {
        message = error.message;
    }

    if (error.errors) {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message += ' | ' + error.errors[errorName].message;
        }
    }
 
    return message;
};
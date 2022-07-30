const Joi = require('joi');
const express = require('express');
const app = express();

module.exports = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2 }),

        password: Joi.string()
            .required(),
    })
    try {
        const value = await schema.validateAsync(req.body);
        return next();
    }
    catch (err) {
        console.log('err', err.message);
        res.send({ success: false, status: 401, errors: [{ message: err.message }] });
        return;
    }
}

const Joi = require('joi');

module.exports.artSchema  = Joi.object({
    arts: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});



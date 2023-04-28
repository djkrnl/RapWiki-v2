const mongoose = require("mongoose")
const Joi = require("joi")
const { required } = require("joi")

const rapperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthCity: { type: String, required: false },
    birthCountry: { type: String, required: false },
    deathDate: { type: Date, required: false },
    deathCity: { type: String, required: false },
    deathCountry: { type: String, required: false },
    country: { type: String, required: true },
    occupations: { type: [String], required: true },
    genres: { type: [String], required: true },
    website: { type: String, required: false },
    description: { type: String, required: true },
})

const Rapper = mongoose.model("Rapper", rapperSchema)

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().max(100).label("Rapper Name"),
        fullName: Joi.string().required().max(200).label("Full Name"),
        birthDate: Joi.date().required().max("now").label("Birth Date"),
        birthCity: Joi.string().allow("").max(200).label("Birth City"),
        birthCountry: Joi.string().allow("").max(200).label("Birth Country"),
        deathDate: Joi.date().allow("").greater(Joi.ref("birthDate")).max("now").label("Death Date"),
        deathCity: Joi.string().allow("").max(200).label("Death City"),
        deathCountry: Joi.string().allow("").max(200).label("Death Country"),
        country: Joi.string().required().max(200).label("Country"),
        occupations: Joi.array().required().items(Joi.string().required()).label("Occupations"),
        genres: Joi.array().required().items(Joi.string().required()).label("Genres"),
        website: Joi.string().allow("").max(200).pattern(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).label("Website"),
        description: Joi.string().required().label("Description"),
    })
    return schema.validate(data)
}

module.exports = { Rapper, validate }

const mongoose = require("mongoose")
const Joi = require("joi")

const albumSchema = new mongoose.Schema({
    rapperId: { type: String, required: true },
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    type: { type: String, required: true },
    genres: { type: [String], required: true },
    duration: { type: String, required: true },
    label: { type: String, required: true },
    studio: { type: String, required: false },
    description: { type: String, required: true },
})

const Album = mongoose.model("Album", albumSchema)

const validate = (data) => {
    const schema = Joi.object({
        rapperId: Joi.string().required().length(24).alphanum().lowercase().label("Rapper ID"),
        title: Joi.string().required().max(200).label("Album Name"),
        releaseDate: Joi.date().required().less("now").label("Release Date"),
        type: Joi.string().required().label("Type"),
        genres: Joi.array().required().items(Joi.string().required()).label("Genres"),
        duration: Joi.string().required().max(10).pattern(/^(\d)*?\d:[0-5]\d$/).label("Duration"),
        label: Joi.string().required().max(100).label("Label"),
        studio: Joi.string().allow("").max(100).label("Studio"),
        description: Joi.string().required().label("Description"),
    })
    return schema.validate(data)
}

module.exports = { Album, validate }

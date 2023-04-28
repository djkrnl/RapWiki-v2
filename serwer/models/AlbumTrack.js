const mongoose = require("mongoose")
const Joi = require("joi")

const albumTrackSchema = new mongoose.Schema({
    albumId: { type: String, required: true },
    trackNumber: { type: Number, required: true },
    trackName: { type: String, required: true },
    trackLength: { type: String, required: true },
})

const AlbumTrack = mongoose.model("AlbumTrack", albumTrackSchema)

const validate = (data) => {
    const schema = Joi.object({
        albumId: Joi.string().required().length(24).alphanum().lowercase().label("Album ID"),
        trackNumber: Joi.number().required().integer().min(1).label("Track Number"),
        trackName: Joi.string().required().max(200).label("Album Name"),
        trackLength: Joi.string().required().pattern(/^(\d)*?\d:[0-5]\d$/).label("Track Length"),
    })
    return schema.validate(data)
}

module.exports = { AlbumTrack, validate }

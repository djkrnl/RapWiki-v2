const router = require("express").Router()
const { AlbumTrack, validate } = require("../models/AlbumTrack")
const bcrypt = require("bcrypt")
const authenticateToken = require("../components/authenticateToken")

router.get("/:id", authenticateToken, async (req, res) => {
    AlbumTrack.findById(req.params.id).exec()
        .then(async () => {
            const albumTrack = await AlbumTrack.findById(req.params.id)
            if (!albumTrack) return res.status(404).send({ message: "No album track with specified ID found" })

            res.status(200).send(albumTrack);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.get("/album/:albumId", authenticateToken, async (req, res) => {
    AlbumTrack.find({ albumId: req.params.albumId }).exec()
        .then(async () => {
            const albumTracks = await AlbumTrack.find({ albumId: req.params.albumId });
            if (!albumTracks) return res.status(404).send({ message: "No album with specified ID found" })

            res.status(200).send(albumTracks)
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.get("/album/:albumId/:trackNumber", authenticateToken, async (req, res) => {
    AlbumTrack.findOne({ albumId: req.params.albumId, trackNumber: req.params.trackNumber }).exec()
        .then(async () => {
            const albumTrack = await AlbumTrack.findOne({ albumId: req.params.albumId, trackNumber: req.params.trackNumber })
            if (!albumTrack) return res.status(404).send({ message: "The specified album does not have a track with that number, or album with specified ID does not exist" })

            res.status(200).send(albumTrack);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send({ message: error.details[0].message })

        const track = await AlbumTrack.findOne({ albumId: req.body.albumId, trackNumber: req.body.trackNumber })
        if (track) return res.status(409).send({ message: "This album already has a track with that number" })

        await new AlbumTrack({ ...req.body }).save()
        res.status(201).send({ message: "Album track created" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    AlbumTrack.findById(req.params.id).exec()
        .then(async () => {
            const { error } = validate(req.body)
            if (error) return res.status(400).send({ message: error.details[0].message })

            const albumTrack = await AlbumTrack.findByIdAndUpdate(req.params.id, req.body).exec()
            if (!albumTrack) return res.status(404).send({ message: "No album track with specified ID found" })
            res.status(201).send({ message: "Album track updated" })
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

module.exports = router
const router = require("express").Router()
const { Album, validate } = require("../models/Album")
const bcrypt = require("bcrypt")
const authenticateToken = require("../components/authenticateToken")

router.get("/", authenticateToken, async (req, res) => {
    Album.find().sort({'releaseDate': 1}).exec()
        .then(async () => {
            const albums = await Album.find().sort({'releaseDate': 1})

            res.status(200).send(albums)
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.get("/:id", authenticateToken, async (req, res) => {
    Album.findById(req.params.id).exec()
        .then(async () => {
            const album = await Album.findById(req.params.id)
            if (!album) return res.status(404).send({ message: "No album with specified ID found" })

            res.status(200).send(album);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.get("/rapper/:rapperId", authenticateToken, async (req, res) => {
    Album.find({ rapperId: req.params.rapperId }).sort({'releaseDate': 1}).exec()
        .then(async () => {
            const albums = await Album.find({ rapperId: req.params.rapperId }).sort({'releaseDate': 1})
            if (!albums) return res.status(404).send({ message: "No rapper with specified ID found" })

            res.status(200).send(albums);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send({ message: error.details[0].message })

        const album = await new Album({ ...req.body }).save()
        res.status(201).send({ message: album._id })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    Album.findById(req.params.id).exec()
        .then(async () => {
            const { error } = validate(req.body)
            if (error) return res.status(400).send({ message: error.details[0].message })

            const album = await Album.findByIdAndUpdate(req.params.id, req.body).exec()
            if (!album) return res.status(404).send({ message: "No album with specified ID found" })
            res.status(201).send({ message: "Album updated" })
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

router.delete("/:id", authenticateToken, async (req, res) => {
    Album.findById(req.params.id).exec()
        .then(async () => {
            const album = await Album.findByIdAndDelete(req.params.id)
            if (!album) return res.status(404).send({ album: "No rapper with specified ID found" })

            res.status(201).send({ message: "Album deleted" })
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.delete("/rapper/:rapperId", authenticateToken, async (req, res) => {
    try {
        await Album.deleteMany({ rapperId: req.params.rapperId })
        res.status(201).send({ message: "All albums by specified rapper deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

module.exports = router
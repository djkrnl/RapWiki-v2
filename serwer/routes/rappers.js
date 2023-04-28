const router = require("express").Router()
const { Rapper, validate } = require("../models/Rapper")
const { Album } = require("../models/Album")
// const { AlbumTrack } = require("../models/AlbumTrack")
const bcrypt = require("bcrypt")
const authenticateToken = require("../components/authenticateToken")

router.get("/", authenticateToken, async (req, res) => {
    Rapper.find().sort({'name': 1}).exec()
        .then(async () => {
            const rappers = await Rapper.find().sort({'name': 1});

            res.status(200).send(rappers);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

router.get("/:id", authenticateToken, async (req, res) => {
    Rapper.findById(req.params.id).exec()
        .then(async () => {
            const rapper = await Rapper.findById(req.params.id)
            if (!rapper) return res.status(404).send({ message: "No rapper with specified ID found" })

            res.status(200).send(rapper);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send({ message: error.details[0].message })

		const rapper = await new Rapper({ ...req.body }).save()
        res.status(201).send({ message: rapper._id })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    Rapper.findById(req.params.id).exec()
        .then(async () => {
            const { error } = validate(req.body)
            if (error) return res.status(400).send({ message: error.details[0].message })

            const rapper = await Rapper.findByIdAndUpdate(req.params.id, req.body).exec()
            if (!rapper) return res.status(404).send({ message: "No rapper with specified ID found" })
            res.status(201).send({ message: "Rapper updated" })
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

router.delete("/:id", authenticateToken, async (req, res) => {
    Rapper.findById(req.params.id).exec()
        .then(async () => {
            const rapper = await Rapper.findByIdAndDelete(req.params.id)
            if (!rapper) return res.status(404).send({ message: "No rapper with specified ID found" })

            Album.deleteMany({ rapperId: req.params.id })

            res.status(201).send({ message: "Rapper deleted" })
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
})

module.exports = router
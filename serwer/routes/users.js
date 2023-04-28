const router = require("express").Router()
const { User, validate } = require("../models/User")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(409).send({ message: "This e-mail is already assigned to an user" })
			
		const userName = await User.findOne({ username: req.body.username })
        if (userName) return res.status(409).send({ message: "This username is already assigned to an user" })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        await new User({ ...req.body, password: hashedPassword }).save()
        res.status(201).send({ message: "User created" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router
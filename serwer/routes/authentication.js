const router = require("express").Router()
const { User } = require("../models/User")
const bcrypt = require("bcrypt")
const Joi = require("joi")

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(401).send({ message: "This username is not associated with any user" })

        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCheck) return res.status(401).send({ message: "Incorrect password" })

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Successfully logged in" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = router
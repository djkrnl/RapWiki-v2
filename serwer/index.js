const usersRoutes = require("./routes/users")
const authenticationRoutes = require("./routes/authentication")
const rappersRoutes = require("./routes/rappers")
const albumsRoutes = require("./routes/albums")
// const albumTracksRoutes = require("./routes/albumtracks")

require('dotenv').config()
const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())

app.use(cors())

app.use("/api/users", usersRoutes)
app.use("/api/authentication", authenticationRoutes)
app.use("/api/rappers", rappersRoutes)
app.use("/api/albums", albumsRoutes)
// app.use("/api/albumtracks", albumTracksRoutes)

const port = process.env.PORT || 8000

const startDatabase = require('./components/db')
startDatabase()

app.listen(port, () => console.log(`Server is listening on port ${port}`))
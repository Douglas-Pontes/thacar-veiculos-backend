const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("./config/multer")

const CarImages = require("./models/CarImages")

routes.get("/carimages", async (req, res) => {
    const posts = await CarImages.find();

    return res.json(posts)
})

routes.post("/carimages", multer(multerConfig).single("file"), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file

    const post = await CarImages.create({
        name,
        size,
        key,
        url
    })

    return res.json(post)
})


routes.delete("/carimages/:id", async (req, res) => {
    const post = await CarImages.findById(req.params.id)

    await post.remove()

    return res.send()
})
module.exports = routes
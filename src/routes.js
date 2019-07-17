const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("./config/multer")

const CarImages = require("./models/CarImages")
const Carros = require("./models/Carros")

routes.get("/carimages", async (req, res) => {
    const posts = await CarImages.find();

    return res.json(posts)
})

routes.get("/carros", async (req, res) => {

        const posts = await Carros.find();
        var cars = [];
        let i = 0;

        posts.map(async (item) => {
            let carImages = await CarImages.find({ carId: item._id }).catch((error) => { console.log(error) });
            i++;

            let _carImages = [];

            carImages.map((image) => {
                _carImages.push({ id: image._id, url: image.url });
            });

            const { nome, brand, year, color, km, doors, gears, fuel, description, features } = item;

            var car = {
                nome,
                brand,
                year,
                color,
                km,
                doors,
                gears,
                fuel,
                description,
                features,
                carImages: _carImages
            }
            
            cars.push(car);
            i == posts.length ? res.json(cars) : null

        });
})

routes.post("/carimages", multer(multerConfig).single("file"), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file
    const { carId } = req.query;

    const post = await CarImages.create({
        name,
        size,
        key,
        url,
        carId
    })

    return res.json(post)
})

routes.post("/carros", async (req, res) => {
    const { nome, brand, year, color, km, doors, gears, fuel, description, features } = req.body;
    
    const post = await Carros.create({
        nome,
        brand,
        year,
        color,
        km,
        doors,
        gears,
        fuel,
        description,
        features
    });

    return res.json(post);

})

routes.delete("/carros/:id", async (req, res) => {
    const post = await Carros.findById(req.params.id)

    await post.remove()

    return res.send()
})

routes.delete("/carimages/:id", async (req, res) => {
    const post = await CarImages.findById(req.params.id)

    await post.remove()

    return res.send()
})
module.exports = routes
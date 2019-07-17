const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const CarrosSchema = new mongoose.Schema({
    nome: String,
    brand: String,
    year: String,
    color: String,
    km: String,
    doors: Number,
    gears: String,
    fuel: String,
    description: String,
    features: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Carros", CarrosSchema)
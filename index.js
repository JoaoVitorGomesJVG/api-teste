const fastify = require("fastify");
const fs = require("fs");
const { promisify } = require("util")

const app = fastify()

const readFile = promisify(fs.readFile)

app.get("/books", async (req, res) => {
    const json = require("./livros.json")

    res.header("Access-Control-Allow-Origin", "*")

    return json
})

app.get("/books/:bookId", async (req, res) => {
    const json = require("./livros.json");

    const book = json.find((book) => {
        return book.id == req.params.bookId
    })

    res.header("Access-Control-Allow-Origin", "*")

    if(!book) {
        return res.status(404).send({
            error: "wrongID"
        })
    }

    return book
})

app.get("/images/:imageName", async (req, res) => {
    const imageName = req.params.imageName

    if(!imageName) {
        return res.status(400).send({
            error: "Provide a image name"
        })
    }

    const image = await readFile(`./images/${imageName}`)

    res.type("image/jpeg")

    return image
})

app.listen({
    port: Number(process.env.PORT) || 3030
})
const path = require('path')
const express = require("express");
const viteExpress = require("vite-express");

const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get("/", (_, res) => {
    const page = {
        title: 'Produtos'
    }
    res.render("blank-page", page)
});

app.get("/produtos", (_, res) => {
    const page = {
        title: 'Produtos'
    }

    res.render("products", page)
});

viteExpress.listen(app, port, () => console.log("Server is listening on port " + port));

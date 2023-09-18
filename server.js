const path = require('path')
const express = require("express");
const viteExpress = require("vite-express");

const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get("/", (req, res) => {
    const page = {
        title: 'Dashboard',
        url: req.path
    }
    res.render("blank-page", page)
});

app.get("/produtos", (req, res) => {
    const page = {
        title: 'Produtos',
        url: req.path
    }

    res.render("products", page)
});

app.get("/produtos/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar Produto',
        url: req.path
    }

    res.render("products-form", page)
});

app.get("/contatos", (req, res) => {
    const page = {
        title: 'Contatos',
        url: req.path
    }

    res.render("contacts", page)
});

viteExpress.listen(app, port, () => console.log("Server is listening on port " + port));

const path = require('path')
const express = require("express");
const viteExpress = require("vite-express");

const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// app.use(express.static('public'));

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
        url: req.path,
        products: [
            { id: 1, name: 'Refrigerante Zero Açucar', owner: 'Lionel Messi', price: 187999, quantity: 10 },
            { id: 1, name: 'Refrigerante Zero Açucar', owner: 'Lionel Messi', price: 187999, quantity: 10 },
        ]
    }

    res.render("products", page)
});

app.get("/produtos/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar',
        url: req.path
    }

    res.render("products-form", page)
});

app.get("/produtos/editar/:id", (req, res) => {
    const page = {
        title: 'Editar',
        url: req.path
    }

    res.render("products-form", page)
});

app.get("/categorias", (req, res) => {
    const page = {
        title: 'Categorias',
        url: req.path,
        categories: [
            { id: 1, name: 'Combos', status: 'visible' },
            { id: 2, name: 'Adicionais', status: 'hidden' },
        ]
    }

    res.render("categories", page)
});

app.get("/categorias/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar',
        url: req.path
    }

    res.render("categories-form", page)
});

app.get("/categorias/editar/:id", (req, res) => {
    const page = {
        title: 'Editar',
        url: req.path
    }

    res.render("categories-form", page)
});

app.get("/combos", (req, res) => {
    const page = {
        title: 'Combos',
        url: req.path,
        combos: [
            { id: 1, name: 'Combos', status: 'visible' },
            { id: 2, name: 'Adicionais', status: 'hidden' },
        ]
    }

    res.render("combos", page)
});

app.get("/combos/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar',
        url: req.path,
        products: [
            { id: 1, name: 'Rapadura', price: 4000.50, quantity: 10 },
            { id: 2, name: 'Refrigerante Zero Açucar', price: 7, quantity: 4 },
            { id: 3, name: 'Batata', price: 4, quantity: 9 },
        ]
    }

    res.render("combos-form", page)
});

app.get("/combos/editar/:id", (req, res) => {
    const page = {
        title: 'Editar',
        url: req.path,
        products: [
            { id: 1, name: 'Rapadura', price: 4.50, quantity: 10 },
            { id: 2, name: 'Refrigerante Zero Açucar', price: 7, quantity: 4 },
            { id: 3, name: 'Batata', price: 4, quantity: 9 },
        ]
    }

    res.render("combos-form", page)
});

app.get("/promocoes", (req, res) => {
    const page = {
        title: 'Promoções',
        url: req.path,
        promotions: [
            { id: 1, name: 'Combos', status: 'visible' },
            { id: 2, name: 'Adicionais', status: 'hidden' },
        ]
    }

    res.render("promotions", page)
});

app.get("/promocoes/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar',
        url: req.path,
        products: [
            { id: 1, name: 'Rapadura', owner: 'Lionel Messi', price: 187999, quantity: 10 },
            { id: 2, name: 'Refrigerante Zero Açucar', owner: 'Lionel Messi', price: 12.50, quantity: 10 },
        ]
    }

    res.render("promotions-form", page)
});

app.get("/promocoes/editar/:id", (req, res) => {
    const page = {
        title: 'Editar',
        url: req.path
    }

    res.render("promotions-form", page)
});

app.get("/etiquetas", (req, res) => {
    const page = {
        title: 'Etiquetas',
        url: req.path,
        tags: [
            { id: 1, name: 'Mais Pedido', status: 'ativo' },
            { id: 2, name: 'Promoção', status: 'inativo' },
        ]
    }

    res.render("tags", page)
});

app.get("/etiquetas/cadastrar", (req, res) => {
    const page = {
        title: 'Cadastrar',
        url: req.path
    }

    res.render("tags-form", page)
});

app.get("/etiquetas/editar/:id", (req, res) => {
    const page = {
        title: 'Editar',
        url: req.path
    }

    res.render("tags-form", page)
});

app.get("/contatos", (req, res) => {
    const page = {
        title: 'Contatos',
        url: req.path
    }

    res.render("contacts", page)
});

app.get("/configuracoes", (req, res) => {
    const page = {
        title: 'Configurações',
        url: req.path
    }

    res.render("configurations", page)
});

viteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
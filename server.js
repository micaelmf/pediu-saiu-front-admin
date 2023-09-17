const path = require('path')
const express = require("express");
const viteExpress = require("vite-express");

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.get("/message", (_, res) => {
    res.render("message")
});

viteExpress.listen(app, port, () => console.log("Server is listening on port " + port));

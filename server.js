require('dotenv').config();
const path = require('path')
const express = require("express");
const viteExpress = require("vite-express");
const axios = require('axios');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3002;

// Middleware para analisar dados JSON
app.use(express.json());
// Middleware para analisar dados codificados em URL
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
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

app.get("/login", (req, res) => {
  const page = {
    title: 'Entrar',
    url: req.path
  }
  res.render("login", page)
});

app.get("/produtos", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.redirect("/login");
      return;
    }

    const apiUrl = process.env.API_URL;
    const queryExists = Object.keys(req.query).length > 0;

    const responseCategories = await axios.get(apiUrl + "/categories", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let responseProducts = [];

    if (!queryExists) {
      responseProducts = await axios.get(apiUrl + "/products", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      responseProducts = await axios.get(apiUrl + "/products/search", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: req.query
      });
    }

    // Converter o preço para o formato de moeda brasileira
    responseProducts.data.forEach(product => {
      product.price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
    });

    const page = {
      title: 'Produtos',
      url: req.path,
      products: responseProducts.data,
      categories: responseCategories.data,
      filters: req.query
    };

    // Adicionar cabeçalhos para desativar o cache
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    res.render("products", page);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/produtos/cadastrar", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;

    const [responseCategories, responseAccompaniments, responseAdditionals] = await Promise.all([
      axios.get(apiUrl + "/categories", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(apiUrl + "/products/search?type=accompaniment", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(apiUrl + "/products/search?type=additional", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);

    const page = {
      title: 'Cadastrar',
      operation: 'new',
      url: req.path,
      product: {},
      categories: responseCategories.data || [],
      accompaniments: responseAccompaniments.data || [],
      additionals: responseAdditionals.data || [],
      params: req.query
    }

    res.render("products-form", page)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/produtos/cadastrar", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const newData = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      free: req.body.free,
      status: req.body.status,
      categoryId: req.body.categoryId,
      accompanimentsId: req.body.accompaniments,
      maxAccompaniments: req.body.maxAccompaniments,
      additionals: req.body.additionals,
      maxAdditionals: req.body.maxAdditionals
    };

    console.log(newData);

    const response = await axios.post(`${apiUrl}/products`, newData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const page = {
      title: 'Cadastrar',
      url: req.path
    }

    res.redirect(`/produtos`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/produtos/editar/:id", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;

    const [responseProduct, responseCategories, responseAccompaniments, responseAdditionals] = await Promise.all([
      axios.get(`${apiUrl}/products/${req.params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: req.query
      }),
      axios.get(`${apiUrl}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`${apiUrl}/products/search?type=accompaniment`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`${apiUrl}/products/search?type=additional`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);

    const page = {
      title: 'Editar',
      operation: 'edit',
      url: req.path,
      product: responseProduct.data || [],
      categories: responseCategories.data || [],
      accompaniments: responseAccompaniments.data || [],
      additionals: responseAdditionals.data || []
    }

    res.render("products-form", page)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/produtos/editar/:id", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const productId = req.params.id;
    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      free: req.body.free,
      status: req.body.status,
      categoryId: req.body.categoryId,
      accompanimentsId: req.body.accompaniments,
      maxAccompaniments: req.body.maxAccompaniments,
      additionals: req.body.additionals,
      maxAdditionals: req.body.maxAdditionals
    };

    const response = await axios.put(`${apiUrl}/products/${productId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Redirecione o usuário para a página de detalhes ou para onde desejar após a atualização
    res.redirect(`/produtos`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/produtos/:id/atualizar-status", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const productId = req.params.id;
    const updatedData = {
      status: req.body.status
    };

    const response = await axios.patch(`${apiUrl}/products/${productId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json({ message: 'sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/produtos/:id/excluir", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const productId = req.params.id;
    const updatedData = {
      status: req.body.status
    };

    const response = await axios.patch(`${apiUrl}/products/${productId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json({ message: 'sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/categorias", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const response = await axios.get(apiUrl + "/categories", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const page = {
      title: 'Categorias',
      url: req.path,
      categories: response.data
    };

    res.render("categories", page);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/categorias/procurar", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const queryExists = Object.keys(req.query).length > 0;

    if (!queryExists) {
      res.redirect("/categorias");
      return;
    }

    const response = await axios.get(apiUrl + "/categories/search", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: req.query
    });

    const page = {
      title: 'Categorias',
      url: req.path,
      categories: response.data
    };

    res.render("categories", page);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/categorias/cadastrar", (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const page = {
    title: 'Cadastrar',
    operation: 'new',
    url: req.path,
    category: {}
  }

  res.render("categories-form", page)
});

app.post("/categorias/cadastrar", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const newData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    };

    const response = await axios.post(`${apiUrl}/categories`, newData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const page = {
      title: 'Cadastrar',
      url: req.path
    }

    res.redirect(`/categorias`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/categorias/editar/:id", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/categories/${req.params.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const page = {
      title: 'Editar',
      operation: 'edit',
      url: req.path,
      category: response.data
    }

    res.render("categories-form", page)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/categorias/editar/:id", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const categoryId = req.params.id;
    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    };

    const response = await axios.put(`${apiUrl}/categories/${categoryId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Redirecione o usuário para a página de detalhes ou para onde desejar após a atualização
    res.redirect(`/categorias`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/categorias/:id/atualizar-status", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const categoryId = req.params.id;
    const updatedData = {
      status: req.body.status
    };

    const response = await axios.patch(`${apiUrl}/categories/${categoryId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json({ message: 'sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/categorias/:id/excluir", async (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const apiUrl = process.env.API_URL;
    const categoryId = req.params.id;
    const updatedData = {
      status: req.body.status
    };

    const response = await axios.patch(`${apiUrl}/categories/${categoryId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json({ message: 'sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

app.get("/Pedidos", (req, res) => {
  const page = {
    title: 'Pedidos',
    url: req.path,
    orders: [
      {
        id: 3,
        items: [
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          },
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          },
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          }
        ],
        qtdItems: 3,
        totalValue: 99.60,
        paymentMethod: "cash",
        changeTo: 100.00,
        status: "waiting",
        customer: {
          name: "Micael Ferreira",
          contact: {
            celPhone: "88996609498",
            ddi: "55",
            email: "micaelmf2@gmail.com",
          },
          address: {
            street: "Vila Matoso",
            number: "836",
            district: "Centro",
            city: "Russas"
          }
        }
      },
      {
        id: 3,
        items: [
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          },
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          },
          {
            sequence: 1,
            product: 'sanduba do bom',
            unitaryValue: 29.90,
            quantity: 2,
            observations: "Sem carne =)",
            additional: [11, 27, 31],
            accompaniment: [71, 21, 12]
          }
        ],
        qtdItems: 3,
        totalValue: 99.60,
        paymentMethod: "cash",
        changeTo: 100.00,
        status: "waiting",
        customer: {
          name: "Micael Ferreira",
          contact: {
            celPhone: "88996609498",
            ddi: "55",
            email: "micaelmf2@gmail.com",
          },
          address: {
            street: "Vila Matoso",
            number: "836",
            district: "Centro",
            city: "Russas"
          }
        }
      }
    ]
  }

  res.render("orders", page)
});

app.get("/usuario/perfil", (req, res) => {
  const page = {
    title: 'Perfil',
    url: req.path
  }

  res.render("user-perfil-form", page)
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

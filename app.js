const express = require('express');
const app = express();
const porta = 8080;
const bodyParser = require('body-parser');

// Configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

// Configurar os arquivos da pasta public
app.use(express.static('public'));

// Configurar o processamento de dados do forms
app.use(bodyParser.urlencoded({ extended: true }));

// Dados
const posts = [
    {
        id: 1,
        titulo: 'Post 1',
        conteudo: 'Conteúdo do post 1'
    },
    {
        id: 2,
        titulo: 'Post 2',
        conteudo: 'Conteúdo do post 2'
    },
    {
        id: 3,
        titulo: 'Post 3',
        conteudo: 'Conteúdo do post 3'
    }
];

// Rotas
app.get('/', (req, res) => {
    res.render('index', { posts });
});


app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post não encontrado');
    res.render('post', { post });
});


// rotas para exibir o formulario de add 

app.get('/add', (req, res) => {
    res.render('add');
});

// rotas para processar o formulario de add

app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body;
    const id = posts.length + 1;

    posts.push({ id: id, titulo, conteudo });

    res.redirect('/');
});

// Iniciando o servidor 
    app.listen(porta, () => {
        console.log(`Servidor rodando na porta ${porta}`);
    });
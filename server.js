const http = require('http')
// const products = require('../data/product')
const { getProducts, getProduct, createProduct } = require('./controllers/productControllers')

const server = http.createServer((req, res) => { 
    // console.log(124);
    // res.statusCode = 200
    // res.setHeader('content-type', 'text/html')
    // res.write('<h1>Hello World</h1>')
    // res.end()

    if (req.url === '/api/products' && req.method === 'GET') {
        // res.writeHead(200, { 'Content-Type': 'application/json' })
        // res.end(JSON.stringify(products));
        getProducts(req, res)
    } else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message : 'ERROR 404' }));
    }
})

  
const PORT = process.env.PORT || 1000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
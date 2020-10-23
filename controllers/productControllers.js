const Product = require('../models/productModels')

//Get All products
//route: GET api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error)
    }
}

//Get single products
//route: GET api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: '404 ERROR!'}));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error)
    }
}

//POST create a product
//route: POST api/products
async function createProduct(req, res, id) {
    try {
        const product = {
            title: 'Test Product',
            description: 'Just a static testing',
            price: 100
        }

        const newProduct = await Product.create(product)
        
        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getProducts,
    getProduct,
    createProduct
}
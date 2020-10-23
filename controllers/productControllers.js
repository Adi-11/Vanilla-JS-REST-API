const Product = require('../models/productModels')
const { getPostData } = require('../utils')

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
        const body = await getPostData(req)

        const {title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        } 
        
        const newProduct = await Product.create(product)
        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))


    } catch (error) {
        console.log(error)
    }
}

//PUT update a product
//route: PUT api/products/:id
async function updateProduct(req, res, id) {
    try {

        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: '404 ERROR!...'}));
        } else {
            const body = await getPostData(req)
            const {title, description, price} = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            } 
            
            const updateProduct = await Product.update(id, productData)
            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updateProduct))
        }
        
    } catch (error) {
        console.log(error)
    }
}


//DELETE product
// DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: '404 ERROR!'}));
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: `Product ${id} deleted!!`}))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
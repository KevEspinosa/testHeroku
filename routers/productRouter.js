const express = require('express');
const Product = require('../documents/product');

const router = express.Router();
const uri = '/api/v1/product';

router.post(uri, (req, res) => {
    let product = req.body;
    if (product.name == undefined) res.status(403).send('Name is required');
    Product.create(product).then(() => {
        res.status(202).send('product created')
    }).catch(() => {
        res.status(403).send('Information send invalid')
    });
})

router.get(uri, (req, res) => {
    Product.find().then((product) => {
        res.send(product);
    });
})

router.get(uri + '/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id).then((product) => {
        res.send(product);
    }).catch((e) => {
        res.status(403).send('product do not find');
    })
})

router.delete(uri + '/:id', (req, res) => {
    let id = req.params.id;
    Product.findByIdAndDelete(id).then(() => {
        res.send(200).send('Product deleted');
    }).catch((e) => {
        res.status(403).send('Product do not find');
    })
})

router.put(uri + '/:id', (req, res) => {
    let id = req.params.id;
    let product = req.body;
    Product.findByIdAndUpdate(id, product).then(() => {
        res.send(201).send('Product updated');
    }).catch((e) => {
        res.status(403).send('Product do not find');
    })
})

module.exports = router;
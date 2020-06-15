const express = require('express');
const Category = require('../documents/category');

const router = express.Router();
const uri = '/api/v1/category';

router.post(uri, (req, res) => {
    let category = req.body;
    if (category.name == undefined ) res.status(403).send('Name is required');
    Category.create(category).then(() => {
        res.status(202).send('CategoryRouter created')
    }).catch(() => {
        res.status(403).send('Information send invalid')
    });
})

router.get(uri, (req, res) => {
    Category.find().then((categories) => {
        res.send(categories);
    });
})

router.get(uri + '/:id', (req, res) => {
    let id = req.params.id;
    Category.findById(id).then((category) => {
        res.send(category);
    }).catch((e) => {
        res.status(403).send('category do not find');
    })
})

router.delete(uri + '/:id', (req, res) => {
    let id = req.params.id;
    Category.findByIdAndDelete(id).then(() => {
        res.send(200).send('Category deleted');
    }).catch((e) => {
        res.status(403).send('category do not find');
    })
})

router.put(uri + '/:id', (req, res) => {
    let id = req.params.id;
    let category = req.body;
    Category.findByIdAndUpdate(id, category).then(() => {
        res.send(201).send('Category updated');
    }).catch((e) => {
        res.status(403).send('category do not find');
    })
})

module.exports = router;
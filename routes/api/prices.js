const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validatePriceInput = require('../../validation/price');
const validateUpdatePriceInput = require('../../validation/updatePrice');
const Price = require('../../models/Price');
const Category = require('../../models/Category');

router.post('/price-add', (req, res) => {
    const { errors, isValid } = validatePriceInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Price.findOne({ amount: req.body.amount }).then(price => {
        if (price) {
            return res.status(400).json({ amount: 'Price already submitted' });//amount already exists
        } else {
            const newPrice = new Price({  
                category_id: req.body.category_id,
                amount: req.body.amount,
                uom: req.body.uom,
                location: req.body.location,
                description: req.body.description,
                status: req.body.status,
                featured: req.body.featured
            });
                    newPrice
                            .save()
                            .then(price => {
                            return res.status(200).json({message: 'Price added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                       
        }
        
    });
});

router.post('/price-data', (req, res) => {
    var categoryid = (req.body.category_id)? req.body.category_id: null;
     Price.find({category_id:categoryid}).select(['']).then(price => {
        if (price) {
            return (res.status(200).send(price));
        }
    });
});

router.post('/price-delete', (req, res) => {
    Price.deleteOne({ _id: req.body._id}).then(price => {
        if (price) {
            return res.status(200).json({message: 'Price deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/price-update', (req, res) => {
    /*const { errors, isValid } = validateUpdateCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    const _id = req.body._id;
    Price.findOne({ _id }).then(price => {
        if (price) {
            let update = {'amount': req.body.amount, 'uom': req.body.uom, 'location': req.body.location, 'description': req.body.description, 'status': req.body.status, 'featured': req.body.featured};
            Price.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update price'});
                } else {
                    return res.status(200).json({ message: 'Price update succesfully , refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now price found to update.' });
        }
    });
});


module.exports = router;
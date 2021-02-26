const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateCategoryInput = require('../../validation/category');
const validateUpdateCategoryInput = require('../../validation/updateCategory');
const Category = require('../../models/Category');


router.post('/category-add', (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Category.findOne({ title: req.body.title }).then(category => {
        if (category) {
            return res.status(400).json({ title: 'Category already exists' });//title already exists
        }
        else {
        /*    var parent_id = "null";*/
            const newCategory = new Category({
                title: req.body.title,
                keywords: req.body.keywords,
                featured: req.body.featured,
                title_mm: req.body.title_mm,
                parent_id: req.body.parent_id ? req.body.parent_id:"null",
            });
                    newCategory
                            .save()
                            .then(category => {
                            return res.status(200).json({message: 'Category added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));              
        }
    });
});

router.post('/category-data', (req, res) => {

	var parentid = (req.body.id)? req.body.id: "null";
	Category.find({parent_id:parentid}).select([]).then(category => {
		if (category) {
			return res.status(200).send(category);
		}
	});
});


router.post('/category-delete', (req, res) => {
    Category.deleteOne({ _id: req.body._id}).then(category => {
        if (category) {
            return res.status(200).json({message: 'Category deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/category-update', (req, res) => {
    /*const { errors, isValid } = validateUpdateCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    const _id = req.body._id;
    Category.findOne({ _id }).then(category => {
        if (category) {
            let update = {'title': req.body.title, 'keywords': req.body.keywords, 'featured': req.body.featured, 'title_mm': req.body.title_mm};
            Category.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update category'});
                } else {
                    return res.status(200).json({ message: 'Category update succesfully , refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now category found to update.' });
        }
    });
});





module.exports = router;
const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Task = require('../models/task');

// Display all lists
router.get('/', (req, res) => {
    List.getAll((err, lists) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.render('lists', {
            title: 'All Lists',
            lists
        });
    });
});

// Display tasks for a specific list
router.get('/:id', (req, res) => {
    const listId = req.params.id;
    
    List.getById(listId, (err, list) => {
        if (err || !list) {
            console.error(err);
            return res.status(404).render('404');
        }
        
        Task.getByListId(listId, (err, tasks) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            
            res.render('list-detail', {
                title: list.name,
                list,
                tasks
            });
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const List = require('../models/list');

router.get('/', async (req, res) => {
    List.getRecent(3, (err, recentLists) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.render('home', {
            title: 'Todo App - Home',
            recentLists
        });
    });
});

module.exports = router;
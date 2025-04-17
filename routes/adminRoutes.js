const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Task = require('../models/task');

// Admin dashboard
router.get('/', (req, res) => {
    res.render('admin', {
        title: 'Admin Dashboard'
    });
});

// List CRUD operations
router.get('/lists/add', (req, res) => {
    res.render('add-list', { title: 'Add New List' });
});

router.post('/lists/add', (req, res) => {
    const { name, description } = req.body;
    List.create(name, description, (err, id) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/lists');
    });
});

router.get('/lists/edit/:id', (req, res) => {
    const listId = req.params.id;
    List.getById(listId, (err, list) => {
        if (err || !list) {
            console.error(err);
            return res.status(404).render('404');
        }
        res.render('edit-list', {
            title: 'Edit List',
            list
        });
    });
});

router.post('/lists/edit/:id', (req, res) => {
    const listId = req.params.id;
    const { name, description } = req.body;
    List.update(listId, name, description, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.redirect(`/lists/${listId}`);
    });
});

router.post('/lists/delete/:id', (req, res) => {
    const listId = req.params.id;
    List.delete(listId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/lists');
    });
});

// Task CRUD operations
router.get('/tasks/add/:listId', (req, res) => {
    const listId = req.params.listId;
    List.getById(listId, (err, list) => {
        if (err || !list) {
            console.error(err);
            return res.status(404).render('404');
        }
        res.render('add-task', {
            title: 'Add New Task',
            list
        });
    });
});

router.post('/tasks/add/:listId', (req, res) => {
    const listId = req.params.listId;
    const { title, description, due_date } = req.body;
    Task.create(listId, title, description, due_date, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.redirect(`/lists/${listId}`);
    });
});

router.get('/tasks/edit/:id', (req, res) => {
    const taskId = req.params.id;
    Task.getById(taskId, (err, task) => {
        if (err || !task) {
            console.error(err);
            return res.status(404).render('404');
        }
        List.getById(task.list_id, (err, list) => {
            if (err || !list) {
                console.error(err);
                return res.status(404).render('404');
            }
            res.render('edit-task', {
                title: 'Edit Task',
                task,
                list
            });
        });
    });
});

router.post('/tasks/edit/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, due_date, is_completed } = req.body;
    Task.update(
        taskId,
        title,
        description,
        due_date,
        is_completed === 'on',
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            Task.getById(taskId, (err, task) => {
                if (err || !task) {
                    console.error(err);
                    return res.status(404).render('404');
                }
                res.redirect(`/lists/${task.list_id}`);
            });
        }
    );
});

router.post('/tasks/delete/:id', (req, res) => {
    const taskId = req.params.id;
    Task.getById(taskId, (err, task) => {
        if (err || !task) {
            console.error(err);
            return res.status(404).render('404');
        }
        Task.delete(taskId, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            res.redirect(`/lists/${task.list_id}`);
        });
    });
});

module.exports = router;
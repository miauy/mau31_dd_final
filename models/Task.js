const db = require('../database/db');

class Task {
    static getByListId(listId, callback) {
        db.all(
            'SELECT * FROM tasks WHERE list_id = ? ORDER BY created_at DESC',
            [listId],
            callback
        );
    }

    static getById(id, callback) {
        db.get('SELECT * FROM tasks WHERE id = ?', [id], callback);
    }

    static create(listId, title, description, dueDate, callback) {
        db.run(
            'INSERT INTO tasks (list_id, title, description, due_date) VALUES (?, ?, ?, ?)',
            [listId, title, description, dueDate],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static update(id, title, description, dueDate, isCompleted, callback) {
        db.run(
            'UPDATE tasks SET title = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?',
            [title, description, dueDate, isCompleted ? 1 : 0, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
    }
}

module.exports = Task;
const db = require('../database/db');

class List {
    static getAll(callback) {
        db.all('SELECT * FROM lists ORDER BY created_at DESC', callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM lists WHERE id = ?', [id], callback);
    }

    static create(name, description, callback) {
        db.run(
            'INSERT INTO lists (name, description) VALUES (?, ?)',
            [name, description],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static update(id, name, description, callback) {
        db.run(
            'UPDATE lists SET name = ?, description = ? WHERE id = ?',
            [name, description, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM lists WHERE id = ?', [id], callback);
    }

    static getRecent(limit, callback) {
        db.all(
            'SELECT * FROM lists ORDER BY created_at DESC LIMIT ?',
            [limit],
            callback
        );
    }
}

module.exports = List;

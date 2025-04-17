const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./database/db.js');

const app = express();

// Handlebars setup
app.engine('handlebars', exphbs.engine({
    extname: '.handlebars',  // Now looks for .handlebars files
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars'); 


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/homeRoutes'));
app.use('/lists', require('./routes/listRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Views directory:", path.join(__dirname, 'views'));
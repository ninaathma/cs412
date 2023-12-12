const express = require('express');
const app = express();
const apiRoutes = require('./routes/ps4');

app.set('view engine', 'pug');
app.set('views', './views');

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Mount the router at /ps4
app.use('/ps4', apiRoutes);

// Route for the initial form
app.get('/', (req, res) => {
    res.render('form');
});

// Handle form submission
app.post('/ps4/form', (req, res) => {
    // Process the form submission here, and redirect or render as needed
    // For now, redirecting to the form page
    res.redirect('/ps4/form');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

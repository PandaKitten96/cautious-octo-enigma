const express = require('express');
const app = express();
const haikus = require('./haikus.json');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { haikus });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
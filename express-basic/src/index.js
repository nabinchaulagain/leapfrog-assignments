const bodyParser = require('body-parser');
const express = require('express');
const { PORT } = require('./config');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

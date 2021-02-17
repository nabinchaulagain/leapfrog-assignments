const bodyParser = require('body-parser');
const express = require('express');
const { PORT } = require('./config');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

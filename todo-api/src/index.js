require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');
const todosRoutes = require('./routes/todos.routes');
const userParser = require('./middlewares/userParser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userParser);

app.use('/api/auth', authRoutes);
app.use('/api/todos', requireAuth, todosRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

module.exports = app;

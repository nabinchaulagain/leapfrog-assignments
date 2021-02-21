require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({ msg: 'hello' });
});
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

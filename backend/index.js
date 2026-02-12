const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const accountsRoutes = require('./routes/accounts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);

app.get('/', (req, res) => res.send({status: 'ParaBank API'}));

app.listen(PORT, () => console.log(`ParaBank backend running on http://localhost:${PORT}`));

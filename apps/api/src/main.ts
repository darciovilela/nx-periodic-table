import express from 'express';
import * as path from 'path';
import cors from 'cors';
import axios from 'axios'
// import { elements } from './data/elements'; 
// import { table } from './table'

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api Darcio!' });
});

// Route to search data using a real API
app.get('/table', async (req, res) => {
  const q = ((req.query.q as string) ?? '').toLowerCase()
  try {
    const response = await axios.get('https://kineticzephyr.onrender.com/periodictable');
    //const data = elements; // response.data.data
    const results = response.data.data.filter(({ name, symbol } ) => name.toLowerCase().includes(q) || symbol.toLowerCase().includes(q));

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

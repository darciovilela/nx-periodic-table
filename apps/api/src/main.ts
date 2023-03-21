import express from 'express';
import * as path from 'path';
import cors from 'cors';
import axios from 'axios'
// import { table } from './table'

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api Darcio!' });
});

// Original route to search data from ts local file
// app.get('/search', (req, res) => {
//   const q = ((req.query.q as string) ?? '').toLowerCase()
//   res.send(table.filter(({name}) =>
//   name.toLowerCase().includes(q)))
// });

// New route to get periodic table from external API
app.get('/table', async (req, res) => {
  try {
    const response = await axios.get('https://kineticzephyr.onrender.com/periodictable');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to search data using a real API
app.get('/search', async (req, res) => {
  const q = ((req.query.q as string) ?? '').toLowerCase()
  try {
    const response = await axios.get('https://kineticzephyr.onrender.com/periodictable');
    const data = response.data.data;
    const results = data.filter(({ name }) => name.includes(q));
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

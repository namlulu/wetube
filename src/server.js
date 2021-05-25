import express from 'express';

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send('<h1>Hello World!</h1>');
};

app.get('/', handleHome);

const handleListening = () =>
  console.log(`Server listenling on port http://localhost:${PORT}`);

app.listen(4000, handleListening);

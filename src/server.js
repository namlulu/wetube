import express from 'express';

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.path} `);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === '/protected') {
    return res.send('<h1>Not Allowed</h1>');
  }
  console.log('Allowed, you may continue');
  next();
};

const handleHome = (req, res) => {
  return res.send('<h1>Hello World!</h1>');
};

const handleProtected = () => {};

app.use(logger, privateMiddleware);
app.get('/', handleHome);
app.get('/protected', handleProtected);

const handleListening = () =>
  console.log(`Server listenling on port http://localhost:${PORT}`);

app.listen(4000, handleListening);

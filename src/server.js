import express from 'express';
import morgan from 'morgan';

const PORT = 4000;

const app = express();
const logger = morgan('dev');

const home = (req, res) => {
  return res.send('Hello home');
};

const login = (req, res) => {
  return res.send('Login');
};

app.use(logger);
app.get('/', home);
app.get('/login', login);

const handleListening = () =>
  console.log(`Server listenling on port http://localhost:${PORT}`);

app.listen(4000, handleListening);

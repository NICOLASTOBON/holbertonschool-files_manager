import express from 'express';
import router from './routes/index';

const app = express();

const PORT = process.env.PORT || 5000;

// get parameter of body
app.use(express.json());

// endpoints
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/notes', notesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
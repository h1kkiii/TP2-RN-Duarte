import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db/database.js';
import router from './routes/notes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', router)

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
  });
}).catch(error =>{
  console.error('Error al conectar con la base de datos:', error);
});
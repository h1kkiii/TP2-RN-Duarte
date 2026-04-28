# 📝 Sistema de Notas — TP3

Aplicación fullstack para gestionar notas personales. Permite crear, visualizar, editar, eliminar y buscar notas en tiempo real. Incorpora estado global mediante Context API y useReducer.

---

## 🛠️ Tecnologías utilizadas

**Frontend**
- React + Vite
- Context API (createContext, useContext)
- useReducer
- CSS (estilos propios)

**Backend**
- Node.js
- Express
- Sequelize (ORM)
- MySQL (vía XAMPP)

---

## 📁 Estructura del proyecto

```
notas-app/
├── client/       → Frontend en React
└── server/       → Backend en Node.js + Express
```

### Estructura del cliente

```
client/src/
├── context/
│   └── NotesContext.jsx   → Contexto global, Provider y useReducer
├── components/
│   ├── NoteList.jsx
│   ├── NoteItem.jsx
│   ├── NoteForm.jsx
│   └── SearchBar.jsx
├── services/
│   └── api.js             → Llamadas HTTP al backend
├── App.jsx
└── main.jsx
```

---

## ⚙️ Requisitos previos

- Node.js v20.19 o superior
- XAMPP con MySQL corriendo en el puerto 3306

---

## 🗄️ Configuración de la base de datos

1. Abrí XAMPP y arrancá el módulo **MySQL**
2. Entrá a **phpMyAdmin** desde el panel de XAMPP
3. Creá una base de datos llamada `notes_db`

Sequelize se encarga de crear la tabla automáticamente al iniciar el servidor.

---

## 🚀 Instalación y ejecución

### Backend

```bash
cd server
npm install
node index.js
```

El servidor quedará corriendo en `http://localhost:3001`

### Frontend

```bash
cd client
npm install
npm run dev
```

El cliente quedará corriendo en `http://localhost:5173`

---

## 🔧 Variables de entorno

### `server/.env`

```
PORT=3001
DB_NAME=notes_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
```

> Si tu usuario de MySQL tiene contraseña, completá `DB_PASSWORD`.

### `client/.env`

```
VITE_API_URL=http://localhost:3001/api/notes
```

---

## 🌐 Estado global

El estado de la aplicación es manejado mediante Context API y useReducer en `src/context/NotesContext.jsx`.

### Acciones del reducer

| Acción | Descripción |
|--------|-------------|
| `SET_LOADING` | Activa o desactiva el estado de carga |
| `SET_ERROR` | Guarda un mensaje de error |
| `SET_NOTES` | Carga todas las notas desde el backend |
| `ADD_NOTE` | Agrega una nueva nota al estado |
| `EDIT_NOTE` | Actualiza una nota existente |
| `DELETE_NOTE` | Elimina una nota del estado |

### Uso en componentes

Cualquier componente puede acceder al estado global con:

```javascript
import { useNotes } from '../context/NotesContext.jsx';

const { notes, loading, error, addNote, editNote, removeNote } = useNotes();
```

---

## 📌 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/notes` | Obtener todas las notas |
| GET | `/api/notes/:id` | Obtener una nota por ID |
| POST | `/api/notes` | Crear una nueva nota |
| PUT | `/api/notes/:id` | Actualizar una nota |
| DELETE | `/api/notes/:id` | Eliminar una nota |

---

## ✨ Funcionalidades

- Crear notas con título, contenido y categoría opcional
- Listar todas las notas
- Editar notas existentes
- Eliminar notas
- Búsqueda en tiempo real con resaltado de coincidencias
- Estados de carga y error
- Cancelar edición en cualquier momento
- Estado global con Context API y useReducer

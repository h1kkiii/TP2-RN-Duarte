const BASE_URL = import.meta.env.VITE_API_URL;

export const getNotes = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getNoteById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createNote = async (note) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(note)
  });
  return res.json();
}

export const updateNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(note)
  });
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};
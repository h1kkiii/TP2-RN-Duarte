import { Router } from "express";
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from "../controllers/notesController.js";
import { upload, compressImage } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', upload.single('image'), compressImage, createNote);
router.put('/:id',upload.single('image'), compressImage, updateNote);
router.delete('/:id', deleteNote);

export default router;
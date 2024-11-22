import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/usersController';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

// Middleware de JwT para saber si el cliente esta autenticado
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    // En el header del request viene el token
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        // En el front-end un 401 devuelve al usuario a la página de login
        res.status(401).json({ error: 'No autorizado' })
        return 
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            console.error('Error en la autenticación: ', err)
            res.status(403).json({ error: 'No tienes acceso a este recurso' })
            return
        }

        next();
    })
}

// Se utiliza la misma tabla de usuarios para no complejizar el proyecto
router.post('/', authenticateToken, createUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser );
router.delete('/:id', authenticateToken, deleteUser);

export default router;
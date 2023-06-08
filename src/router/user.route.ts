import express from 'express';
import { isAuthenticated } from '../middlewares/index.middleware';
import { deleteUser, getAllUsers, getUser, updateUser } from 'controllers/user.controller';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, deleteUser);
    router.patch('/users/:id', isAuthenticated, updateUser);
    router.get('/user/:id', isAuthenticated, getUser);
}
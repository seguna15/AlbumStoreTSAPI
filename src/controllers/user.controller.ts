import { Request, Response } from "express";
import { deleteUserById, getUsers, getUserById } from "services/user.service";

/**
 ** get all users
 * @param req 
 * @param res 
 * @returns users
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        if(!users) return res.sendStatus(400);

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

/**
 ** get a user by their id
 * @param req 
 * @param res 
 * @returns user
 */
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        if(!user) return res.sendStatus(400);

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


/**
 ** Deletes a user by id
 * @param req 
 * @param res 
 * @returns deleted user
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

/**
 ** update user by id
 * @param req 
 * @param res 
 * @returns updated user
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body;

        if(!username)  return res.sendStatus(400);

        const user = await getUserById(id);

        user.username = username;

        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
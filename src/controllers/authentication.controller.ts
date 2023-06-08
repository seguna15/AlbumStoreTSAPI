import express from 'express';
import { getUserByEmail, createUser } from '../services/user.service';
import { authentication, random } from '../utils/index.util';

/**
 ** login user; path 'api/auth/login'
 * @param req 
 * @param res 
 * @returns logged in user
 */
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password)  return res.sendStatus(400);

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) return res.sendStatus(400);

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash) return res.sendStatus(403);

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('ALBUM-AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

/**
 ** register user; path 'api/auth/register'
 * @param req 
 * @param res 
 * @returns registered in user
 */
export const register = async  (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, roles } = req.body;
        if(!email || !password || !username) return res.sendStatus(400);

        const existingUser = await getUserByEmail(email);
        if(existingUser) return res.sendStatus(409) //conflict

        const salt = random();
        const user = await createUser({
            email,
            username,
            roles,
            authentication: {
                salt, 
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error); 
        return res.sendStatus(400);
    }
}

import express from 'express';
import {merge, get} from 'lodash';

import { getUserBySessionToken } from '../services/user.service';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ALBUM-AUTH'];
        
        if(!sessionToken)  return res.sendStatus(403); //forbidden

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) return res.sendStatus(403);
        
        merge(req, {identity: existingUser});

        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
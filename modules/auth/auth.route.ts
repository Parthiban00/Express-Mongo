import express from 'express';
const authRouter = express.Router();
import { signin, signout } from '../auth/auth.controller';

authRouter.post('/signin', signin);
authRouter.get('/signout', signout);

module.exports = authRouter
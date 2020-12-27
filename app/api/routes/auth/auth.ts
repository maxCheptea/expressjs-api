import { Router } from 'express';
import { login } from '../../../services/auth/AuthService';
import HttpStatusCode from '../../../utils/enums/HttpCodeStatuses';

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password).catch(err => {
        res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ message: err.message, status: HttpStatusCode.NOT_FOUND });
    });

    if (token) {
        res.json({ token }).status(HttpStatusCode.OK);
    }
});

export default authRoutes;
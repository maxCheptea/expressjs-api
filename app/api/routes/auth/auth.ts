import { Router } from 'express';
import { login, logout } from '../../../services/auth/AuthService';
import HttpStatusCode from '../../../utils/enums/HttpCodeStatuses';

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password).catch(err => {
        res.status(HttpStatusCode.NOT_FOUND)
            .json({ message: err.message, status: HttpStatusCode.NOT_FOUND });
    });
    if (token) {
        res.json({ token }).status(HttpStatusCode.OK);
    }
});

authRoutes.get('/logout', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token !== null) {
        await logout(token);
    }
    res.json({ message: 'User logged out', status: HttpStatusCode.NOT_FOUND })
        .status(HttpStatusCode.OK);
});

export default authRoutes;
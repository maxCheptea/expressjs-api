import { Router } from 'express';
import { login, logout } from '../../../services/auth/AuthService';
import HttpStatusCode from '../../../utils/enums/HttpCodeStatuses';

const privilegesRoutes = Router();

privilegesRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password).catch(err => {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: err.message });
    });
    if (token) {
        res.json({ token }).status(HttpStatusCode.OK);
    }
});

privilegesRoutes.get('/logout', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
        await logout(token);
    }
    res.json({ message: 'User logged out' }).status(HttpStatusCode.OK);
});

export default privilegesRoutes;

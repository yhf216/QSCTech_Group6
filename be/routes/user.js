import jwt from 'express-jwt'
const secret = process.env.JWT_SECRET;

const HandleJWT = (user, res) => {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '2d' });
    res.cookie('Authorization', `Bearer ${token}`, { httpOnly: true });
}

export default (app, db) => {
    app.post('/user/login', async (req, res) => {    
        const { username, password } = req.body;
        if(typeof username!== "string" || typeof password!== "string") {
            return res.status(400).json({ error: 'Username and password must be strings' });
        }
        if (!username ||!password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await db.get(`SELECT * FROM users WHERE username =? AND password =?`, [username, password])    ;
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        HandleJWT(user, res);
        res.json({ message: 'Login successful', user });
    })
    app.post('/user/register', async (req, res) => {    
        const { username, password /* password is SHA256 hashed */ } = req.body;
        if(typeof username!== "string" || typeof password!== "string") {
            return res.status(400).json({ error: 'Username and password must be strings' });
        }
        if (!username ||!password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (/^[a-f0-9]{64}$/.test(password) === false) {
            return res.status(400).json({ error: 'Password invalid' });
        }
        if (await db.get(`SELECT * FROM users WHERE username =?`, [username])) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const user = await db.run(`INSERT INTO users (username, password, created_at) VALUES (?,?, CURRENT_TIMESTAMP)`, [username, password]);
        HandleJWT(user, res);
        res.json({ message: 'Registration successful', user });
    })
};

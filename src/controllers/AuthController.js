const express = require('express');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const authconfig = require('../config/auth.json')

const UserModel = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
    // expiresIN é o tempo que o token vai expirar
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authconfig.secret, {
        expiresIn: 86400
    });
}

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({email}).select('+password');

    if (!user) {
        return res.status(400).json({
            error: false,
            message: 'Email não cadastrado!',
        });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({
            error: false,
            message: 'Senha inválida!',
        });
    }

    user.password = undefined;

    return res.status(200).json({
        user,
        token: generateToken(user),
        error: false,
        message: 'Usuário logado!'
    });
});

router.post('/register', async(req, res) => {
    const { email } = req.body;

    // tratando error de email já cadastrado
    if (await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message: 'Usuário já existe!'
        });
    }

    // Criando usuário no banco de dados
    const user = await UserModel.create(req.body);   

    // Para não retornar o password
    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user),
        error: false,
        message: 'Usuário registrado com sucesso!',
    });
});


module.exports = router;
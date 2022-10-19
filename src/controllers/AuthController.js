const express = require('express');
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');

const router = express.Router();

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
            message: 'Usuário já esxiste!'
        });
    }

    // Criando usuário no banco de dados
    const User = await UserModel.create(req.body);   

    // Para não retornar o password
    User.password = undefined;

    return res.json({
        error: false,
        message: 'Usuário registrado com sucesso!',
        data: User
    });
});


module.exports = router;
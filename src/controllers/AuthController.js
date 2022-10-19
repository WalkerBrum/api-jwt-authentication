const express = require('express');

const UserModel = require('../models/User');

const router = express.Router();

router.post('/register', async(req, res) => {
    const { email } = req.body;

    // tratando error de email já cadastrado
    if (await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message: 'User alredy exists'
        });
    }

    // Criando usuário no banco de dados
    const User = await UserModel.create(req.body);   

    // Para não retornar o password
    User.password = undefined;

    return res.json({
        error: false,
        message: 'Registred with sucess!',
        data: User
    });
});


module.exports = router;
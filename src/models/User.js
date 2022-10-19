const mongoose = require('../database');
const bcrypt = require('bcrypt');

// Definindo estrutura do registro
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Criptografando senha, se usar arrow function da erro
UserSchema.pre('save', async function(next) {
    // 10 significa que a senha será 10 vezes mais forte
    const hash = await bcrypt.hash(this.password, 10);
    console.log(this);
    console.log(hash);
    this.password = hash;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
const mongoose = require('mongoose');

const user = 'walkerLobato';
const senha = 'FJcWCJEJXkl4Y3A4';
const url = `mongodb+srv://${user}:${senha}@mongoapi.lfqwhdq.mongodb.net/?retryWrites=true&w=majority`;

// Conectando ao banco de dados
mongoose.connect(url, {}, (error) => {
    if (error) {
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }

    console.log('Conexão com mongodb estável');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
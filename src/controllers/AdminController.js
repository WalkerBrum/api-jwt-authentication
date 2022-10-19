const express = require('express');
const router = express.Router();

// Para validar se usuário possui um token
router.get('/users', (req, res) => {
    console.log('controller');
    return res.json({});
});

module.exports = router;

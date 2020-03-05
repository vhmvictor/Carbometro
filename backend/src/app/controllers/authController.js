const express = require('express');
const bcrypt = require('bcryptjs'); //para validar se a senha é correta
const jwt = require('jsonwebtoken'); //biblioteca para autenticação com token
const crypto = require('crypto'); //gera token para recuperação de senha
const mailer = require('../../modules/mailer'); //lib para envio de email

const authConfig = require('../../config/auth');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');

const { Router } = require('express');

const routes = Router();
const authRoutes = Router();
authRoutes.use(authMiddleware);

function generateToken(params = {}) { //função para atenticação com token (hash: utlizado da Config)
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

routes.get('/user/:id', async (request, response) => {
    const id = request.params.id;
    const user = await User.findById(id)
    try {
        return response.json({ user });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading User' });
    }
})

routes.get('/users', async (request, response) => {
    try {
        const users = await User.find();

        return response.send({ users });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading User' });
    }
})

routes.post('/register', async (request, response) => {
    const { email } = request.body; //pegando o email que foi inserido no front pelo usuário

    try {
        if (await User.findOne({ email }))
            return response.status(400).send({ error: 'User already exists' }); //se, email já existe, retorna(response) mensagem que já existe cadastrado

        const user = await User.create(request.body); //criando usuário a partir do que foi inserido no front end pelo usuário

        user.password = undefined; //removendo senha do BD apos criação(segurança) 

        return response.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return response.status(400).send({ error: 'Register invalid' });
    }

});

routes.post('/login', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return response.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))  //comparando o password digitado com o armazenado no banco
        return response.status(400).send({ error: 'Invalid password' });

    user.password = undefined; // nao disponibilizando a senha para visualização

    response.send({
        user,
        token: generateToken({ id: user.id })
    });
});

routes.post('/forgot_password', async (request, response) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return response.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(3).toString('hex'); //criando token de 20 caracteres em string hexadecimal
        const name = user.name;


        const now = new Date();
        now.setHours(now.getHours() + 1); //duração de expiração token

        await User.findByIdAndUpdate(user.id, {
            '$set': {  //forma de atualizar valores/variáveis do banco. Nesse caso alterando o token de autenticação de senha
                passwordResetToken: token,
                passwordResetExpires: now,
            },
        });

        mailer.sendMail({
            to: email,
            from: 'marcus.vinicius.marques@hotmail.com',
            template: 'auth/forgot_password', //mensagem de envio de token configurada no arquivo "forgot_password.html"
            context: { token, name }, //variavéis que estão dentro do template
            subject: "Recuperação de senha Carbometro"
        }, (err) => {
            if (err) {
                return response.status(400).send({ error: 'Cannot send forgot password email' });

            }
            return response.send();
        })
    } catch (err) {
        response.status(400).send({ error: 'Error on forgot password, try again' });
    }
});

routes.post('/reset_password', async (request, response) => {
    const { email, token, password } = request.body; //usa-se "request" porque queremos pegar as informações que estão no parametro que serão digitadas pelo usuário

    try {
        //passando para o objeto "user" as informações do usuario contidas no banco
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires'); //configuração do mongoose, depois que redefinirmos a senha vamos precisar colocar um tempo de expiração novamente pro token
        // o ".select" é usado para selecionar as informações que queremos resgatar do usuario contidas no banco e fazer o q quisermos com elas
        if (!user)
            return response.status(400).send({ error: 'User not found' }); // validando se o usuario existe

        if (token !== user.passwordResetToken) // validando se o token inserido é igual ao enviado por email
            return response.status(400).send({ error: 'Invalid token' });

        const now = new Date();

        if (now > user.passwordResetExpires) // validando se o token não ta expirado
            return response.status(400).send({ error: 'Token expired, generate new one' });

        user.password = password; // atualizando no banco o novo password

        await user.save(); // nao segue antes de salvar o user

        response.send(); // envia a informação de que deu tudo certo no reset
    }
    catch (err) {
        response.status(400).send({ error: " Cannot reset password, try again " });
    }
});

module.exports = app => { app.use('/auth', authRoutes), app.use('/', routes) }
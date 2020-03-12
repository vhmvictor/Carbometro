//const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

const { Router } = require('express');

const routes = Router();

routes.use(authMiddleware);

//lista glicemias do usuário logado 
routes.get('/searchGlucose/:id', async (request, response) => {
    try {
        const blood_glucoses = await (await User.findById(request.params.id)).get('blood_glucoses');

        return response.send({ blood_glucoses });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading glucoses' });
    }
});

//lista ID glicemias do usuário logado 
routes.get('/searchGlucoseId/:id', async (request, response) => {
    try {
        const blood_glucoses = await (await User.findById(request.params.id)).get('blood_glucoses._id');

        return response.send({ blood_glucoses });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading glucoses' });
    }
});

//lista todos usuários cadastrados
routes.get('/', async (request, response) => {
    try {
        const users = await User.find();
        return response.send({ users });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading User' });
    }
});

//Adiciona uma nova glicemia para o usuário logado 
routes.post('/:userId/add_glucose', async (request, response) => {

    const userId = request.params.userId;
    const { blood_glucoses } = request.body;

    try {

        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                blood_glucoses: blood_glucoses
            }
        });

        return response.send({ user });
    }
    catch (err) {
        console.log(err)
        return response.status(400).send({ error: 'Error creating new glucose' });
    }

});
//lista uma glicemia do usuario logado pelo id
routes.get('/:userId/showValue/:bloodId', async (request, response) => {
    const userId = request.params.userId;
    const bloodId = request.params.bloodId;
    
    try {
        const glucoses = await (await User.findById(userId)).get('blood_glucoses');

        const findByGlucoseId = glucoses.map(glucose => {
            if (glucose.id == `${bloodId}`) {
                return glucose.value
            }
        })
        const filterNumber = findByGlucoseId.filter(function (el) {
            return el != null;
        });
        const valueId = parseInt(filterNumber)

        return response.json(valueId)

    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading glucose' });
    }
});

//Altera glicemia do usuário logado 
routes.put('/:userId/update/:bloodId', async (request, response) => {
    const userId = request.params.userId;
    const bloodId = request.params.bloodId;
    const { value } = request.body;

    try {

        const now = new Date()
        
        const user = await User.updateOne(
            { _id: userId, 'blood_glucoses._id': bloodId },
            { $set: { 'blood_glucoses.$.value': value, "blood_glucoses.$.updatedAt": now }}

        );

        return response.send(user);
        

    } catch (err) {
        console.log(err);
        console.log(value);
        return response.status(400).send({ error: 'Error updating glucose' });
    }

});

//Deleta uma glicemia do usuário logado 
routes.delete('/:userId/delete/:bloodId', async (request, response) => {

    try {
        const del = await User.findByIdAndUpdate(request.params.userId, {
            $pull: { 'blood_glucoses': { _id: request.params.bloodId } }
        }, { multi: true }
        )
        return response.send(del);

    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error deleting glucose' });
    }
});

routes.post('/:userId/add_params', async (request, response) => {

    const userId = request.params.userId;
    const { breakfastCHO, 
            lunchCHO, 
            afternoonSnackCHO, 
            dinnerCHO, 
            born, 
            weight, 
            height, 
            sexo, 
            typeDm 
    } = request.body;

    try {

        const user = await User.updateOne(
            { _id: userId },
            { $set: 
                { 'breakfastCHO': breakfastCHO, 
                  'lunchCHO': lunchCHO, 
                  'afternoonSnackCHO': afternoonSnackCHO, 
                  'dinnerCHO': dinnerCHO,
                  'born': born,
                  'weight': weight,
                  'height': height,
                  'sexo': sexo,
                  'typeDm': typeDm
            }}

        );

        return response.send({ user });
    }
    catch (err) {
        console.log(err)
        return response.status(400).send({ error: 'Error creating params' });
    }

});

module.exports = app => app.use('/user', routes);
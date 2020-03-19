const { Router } = require('express');
const axios = require('axios');

const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

const getParams = require('../utils/CalculateUnity');

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

routes.post('/:userId/add_newFood', async (request, response) => {

    const userId = request.params.userId;

    const { value, carbTotal, foodType } = request.body;

    const apiResponse = await axios.get(`http://localhost:3333/user/${userId}`);

    const { fc, glucoseTarget } = apiResponse.data.user;

    try {

        const user = await User.findByIdAndUpdate(userId, {

            $push: {
                blood_glucoses: {
                    $each: [{ value }],
                    $position: 0
                }
            }
        })

        if (foodType === "breakfastCHO") {
            const { breakfastCHO } = apiResponse.data.user;
            const bolusTotal = getParams(value, carbTotal, breakfastCHO, fc, glucoseTarget);
            console.log(bolusTotal)
            console.log(carbTotal)
            return response.json(bolusTotal);
        } else if (foodType === "lunchCHO") {
            const { lunchCHO } = apiResponse.data.user;
            const bolusTotal = getParams(value, carbTotal, lunchCHO, fc, glucoseTarget);
            console.log(bolusTotal);
            console.log(carbTotal)
            return response.json(bolusTotal);
        } else if (foodType === "afternoonSnackCHO") {
            const { afternoonSnackCHO } = apiResponse.data.user;
            const bolusTotal = getParams(value, carbTotal, afternoonSnackCHO, fc, glucoseTarget);
            console.log(bolusTotal);
            console.log(carbTotal)
            return response.json(bolusTotal);
        } else if (foodType === "dinnerCHO") {
            const { dinnerCHO } = apiResponse.data.user;
            const bolusTotal = getParams(value, carbTotal, dinnerCHO, fc, glucoseTarget);
            console.log(bolusTotal);
            console.log(carbTotal)
            return response.json(bolusTotal);
        }
        console.log('deu certo')

    } catch (err) {
        console.log('deu erro')
        console.log(err)

        return response.status(400).send({ error: 'Error creating new food' });
    }

});


//Adiciona uma nova glicemia para o usuário logado 
/*
routes.post('/:userId/add_glucose', async (request, response) => {

    const userId = request.params.userId;
    const { blood_glucoses } = request.body;

    try {

        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                blood_glucoses: {
                    $each: blood_glucoses,
                    $position: 0
                }
            }
        });

        return response.send({ user });
    }
    catch (err) {
        console.log(err)
        return response.status(400).send({ error: 'Error creating new glucose' });
    }

});
*/

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
            typeDm,
            fc,
            glucoseTarget
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
                  'typeDm': typeDm,
                  'fc': fc,
                  'glucoseTarget': glucoseTarget
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
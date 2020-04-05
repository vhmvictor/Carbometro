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

routes.get('/searchAddFoods/:id', async (request, response) => {
    try {
        const addFoods = await (await User.findById(request.params.id)).get('addFoods');
        return response.send({ addFoods });
    } catch (err) {
        console.log(err);
        return response.status(400).send({ error: 'Error loading foods' });
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

    const { value, totalCho, foodType, refeicoes } = request.body;

    const apiResponse = await axios.get(`http://localhost:3333/user/${userId}`);

    const { fc, glucoseTarget, minTargetRange, maxTargetRange, breakfastCHO, lunchCHO, afternoonSnackCHO, dinnerCHO } = apiResponse.data.user;

    if (foodType === "breakfastCHO") {

        if (value >= minTargetRange && value <= maxTargetRange) {

            const correcao = 0
            const InsulinBolus = (totalCho / breakfastCHO).toFixed(2);
            const totalInsulin = parseFloat(InsulinBolus);

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        } else {

            const InsulinBolus = (totalCho / breakfastCHO).toFixed(2);

            const correcao = ((value - glucoseTarget) / fc).toFixed(2);

            const totalInsulin = (parseFloat(InsulinBolus) + parseFloat(correcao));

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        }

        return response.json({ value, totalCho, breakfastCHO, fc, glucoseTarget, refeicoes });

    } else if (foodType === "lunchCHO") {

        if (value >= minTargetRange && value <= maxTargetRange) {

            const correcao = 0
            const InsulinBolus = (totalCho / lunchCHO).toFixed(2);
            const totalInsulin = parseFloat(InsulinBolus);

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        } else {

            const InsulinBolus = (totalCho / lunchCHO).toFixed(2);

            const correcao = ((value - glucoseTarget) / fc).toFixed(2);

            const totalInsulin = (parseFloat(InsulinBolus) + parseFloat(correcao));

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        }

        return response.json({ value, totalCho, lunchCHO, fc, glucoseTarget, refeicoes });

    } else if (foodType === "afternoonSnackCHO") {

        if (value >= minTargetRange && value <= maxTargetRange) {

            const correcao = 0
            const InsulinBolus = (totalCho / afternoonSnackCHO).toFixed(2);
            const totalInsulin = parseFloat(InsulinBolus);

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        } else {

            const InsulinBolus = (totalCho / afternoonSnackCHO).toFixed(2);

            const correcao = ((value - glucoseTarget) / fc).toFixed(2);

            const totalInsulin = (parseFloat(InsulinBolus) + parseFloat(correcao));

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        }

        return response.json({ value, totalCho, afternoonSnackCHO, fc, glucoseTarget, refeicoes });

    } else if (foodType === "dinnerCHO") {

        if (value >= minTargetRange && value <= maxTargetRange) {

            const correcao = 0
            const InsulinBolus = (totalCho / dinnerCHO).toFixed(2);
            const totalInsulin = parseFloat(InsulinBolus);

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        } else {

            const InsulinBolus = (totalCho / dinnerCHO).toFixed(2);

            const correcao = ((value - glucoseTarget) / fc).toFixed(2);

            const totalInsulin = (parseFloat(InsulinBolus) + parseFloat(correcao));

            try {

                const user = await User.findByIdAndUpdate(userId, {

                    $push: {
                        addFoods: {
                            $each: [{
                                food: refeicoes,
                                blood_glucoses_value: value,
                                totalChoFood: totalCho,
                                totalInsulinCorr: correcao,
                                totalInsulinBolus: InsulinBolus,
                                totalInsulin: totalInsulin
                            }],
                            $position: 0
                        }
                    }
                })

            } catch (err) {
                console.log('deu erro')
                console.log(err)

                return response.status(400).send({ error: 'Error creating new food' });
            }

        }

        return response.json({ value, totalCho, dinnerCHO, fc, glucoseTarget, refeicoes });

    }
    console.log('deu certo')

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
            { _id: userId, 'addFoods._id': bloodId },
            { $set: { 'addFoods.$[].blood_glucoses_value': value, "addFoods.$[].updatedAt": now } }

        );

        return response.send(user);


    } catch (err) {
        console.log(err);
        console.log(value);
        return response.status(400).send({ error: 'Error updating glucose' });
    }

});

//Deleta uma glicemia do usuário logado 
routes.delete('/:userId/delete/:foodId', async (request, response) => {

    console.log(request.params.foodId)

    try {
        const del = await User.findByIdAndUpdate(request.params.userId, {
            $pull: { 'addFoods': { _id: request.params.foodId } }
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
        glucoseTarget,
        minTargetRange,
        maxTargetRange
    } = request.body;

    try {

        const user = await User.updateOne(
            { _id: userId },
            {
                $set:
                {
                    'breakfastCHO': breakfastCHO,
                    'lunchCHO': lunchCHO,
                    'afternoonSnackCHO': afternoonSnackCHO,
                    'dinnerCHO': dinnerCHO,
                    'born': born,
                    'weight': weight,
                    'height': height,
                    'sexo': sexo,
                    'typeDm': typeDm,
                    'fc': fc,
                    'glucoseTarget': glucoseTarget,
                    'minTargetRange': minTargetRange,
                    'maxTargetRange': maxTargetRange
                }
            }

        );

        return response.send({ user });
    }
    catch (err) {
        console.log(err)
        return response.status(400).send({ error: 'Error creating params' });
    }

});

module.exports = app => app.use('/user', routes);
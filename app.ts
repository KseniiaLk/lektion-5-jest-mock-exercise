import express, { json } from 'express';
import {getWeather} from './API';
import { isValidId } from './db';



const makeApp = (createExercise: any , getAllExercises: any, getExerciseById: any) => {
    const app = express();
    app.use(json());
    app.post('/exercise', async (req, res) => {
        const exercise = createExercise(req.body)
        //  new ExerciseModel(req.body);
        res.json(await exercise.save());
    });

    app.get('/exercise', async (req, res) => {
        const response = await getAllExercises();
        console.log('getAllExercises: ', response)
        res.json(response)
    });

    app.get('/exercise/:id', async (req, res) => {
        if (!isValidId(req.params.id)) {
            res.status(400).send();
        }else {
            const exercise = await getExerciseById(req.params.id)
         if (!exercise) {
                    res.status(404).send();
        } else {
            const weatherAPI = await getWeather()
            res.json({ startTime: exercise.startTime, durationInSeconds: exercise.durationInSeconds, activityType: exercise.activityType, temperature: weatherAPI.data.daily.temperature_2m_max[0] });
        }
        }
    });
    return app
}

export default makeApp
import app from './app'
import {createExercise, getAllExercises, getExerciseById} from './db'
import mongoose from 'mongoose';
import {getWeather} from './API'


const makeApp = () => {
    app.post('/exercise', async (req, res) => {
        const exercise = createExercise(req.body)
        //  new ExerciseModel(req.body);
        res.json(await exercise.save());
    });

    app.get('/exercise', async (req, res) => {
        res.json(getAllExercises);
    });

    app.get('/exercise/:id', async (req, res) => {
        const exercise = await getExerciseById(req.params.id)
        if (!exercise) {
            res.status(404).send();
        } else {
            const weatherAPI = getWeather()
            res.json({ startTime: exercise.startTime, durationInSeconds: exercise.durationInSeconds, activityType: exercise.activityType, temperature: weatherAPI.data.daily.temperature_2m_max[0] });
        }
    });

    const port = process.env.PORT || 8080;

    mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
        app.listen(port, () => {
            console.log(`App listening to port ${port}`)
        })
    })
}

makeApp()

import { default as request } from 'supertest';
import makeApp from './app'
import nock from 'nock'


const getAllExercises = jest.fn()
const getExerciseById = jest.fn()
const createExercise = jest.fn()

// test('async test', async () => {
//     const asyncMock = jest.fn<() => Promise<string>>()

const app = makeApp(createExercise, getAllExercises, getExerciseById);

const validExercise = {
    startTime: "2022-12-06",
    durationInSeconds: 5,
    activityType: "running"
}
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT



beforeEach(() => {

    createExercise.mockReset();
    createExercise.mockResolvedValue({
        startTime: "2017-01-01T10:50:00.000Z",
        durationInSeconds: 360,
        activityType: "running",
        _id: "6390537f44dc6222f7b6cf93",
        __v: 0
    })

    getExerciseById
    .mockResolvedValue({
        startTime: "2017-01-01T10:50:00.000Z",
        durationInSeconds: 360,
        activityType: "running",
        // temperature: 25.6
    })
    // .mockRejectedValueOnce(undefined)
    // .mockRejectedValueOnce(undefined)

    getAllExercises.mockResolvedValue([{
    _id: "63904fada480b88bbba9eed5",
    startTime: "2017-01-01T10:50:00.000Z",
    durationInSeconds: 360,
    activityType: "running",
    __v: 0
    },
    {
        _id: "638f13552a1120c75b4079d0",
        startTime: "2017-01-01T10:50:00.000Z",
        durationInSeconds: 360,
        activityType: "running",
        __v: 0
        }])
})


describe("POST /exercise", () => {
    it("should return status 200 after posting an exercise", async () => {
       const response = await request(app).post('/exercise').send(validExercise)
    })
    it("Should return an error if Exercise data is invalid", async () => {
        const response = await request(app).post('/exercise').send('INVALIDvalidExercise')
        expect(response.statusCode).toBe(400)
    })
})

describe("GET /exercise/:id", () => {

    beforeAll(() => {
        nock('https://api.open-meteo.com')
            .get('/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT')
            .reply(200, {
                daily: {
                    temperature_2m_max: [800]
                }
            })
    })

    it("should return 400 if invalid mongo id is provided", async () => {
        const response = await request(app).get("/exercise/fågel");
        expect(response.statusCode).toBe(400);
    })
    it('should call getExercisesById when a get req to /exercise/:id is made', async () => {
        const response = await request(app).get('/exercise/63904fb9a480b88bbba9eed7')
        expect(getExerciseById).toHaveBeenCalled()
        expect(response.body.temperature).toBe(800)
    })
})

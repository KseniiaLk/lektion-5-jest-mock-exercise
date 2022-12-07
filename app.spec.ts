import { default as request } from 'supertest';
import makeApp from './app'
import nock from 'nock'

const getAllExercises = jest.fn()
const getExerciseById = jest.fn()
const createExercise = jest.fn()

const app = makeApp(createExercise, getAllExercises, getExerciseById);
const validExercise = {
    startTime: "2022-12-06",
    durationInSeconds: 5,
    activityType: "running"
}
beforeEach(() => {

    createExercise.mockReset();
    createExercise.mockResolvedValue({
        startTime: "2017-01-01T10:50:00.000Z",
        durationInSeconds: 360,
        activityType: "running",
        _id: "6390537f44dc6222f7b6cf93",
        __v: 0
    })

    getExerciseById.mockResolvedValue({
        "startTime": "2017-01-01T10:50:00.000Z",
        "durationInSeconds": 360,
        "activityType": "running",
        "temperature": 25.6
    })
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

describe("GET /exercise/:id", () => {

    it("should return 404 if invalid mongo id is provided", async () => {
        const response = await request(app).get("/exercise/hejhej");
        expect(response.statusCode).toBe(404);
    })
    it('should call getExercisesById when a get req to /exercise/:id is made', async () => {
        const response = await request(app).get('/exercise/63904fb9a480b88bbba9eed7')
        expect(getExerciseById).toHaveBeenCalled()
        expect(response.body.temperature).toBe(25.6)
    })
})
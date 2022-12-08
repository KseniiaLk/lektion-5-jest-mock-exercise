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


describe("GET /exercise/:id", () => {

    it("should return 400 if invalid mongo id is provided", async () => {
        const response = await request(app).get("/exercise/fågel");
        expect(response.statusCode).toBe(400);
    })
    it('should call getExercisesById when a get req to /exercise/:id is made', async () => {
        const response = await request(app).get('/exercise/63904fb9a480b88bbba9eed7')
        expect(getExerciseById).toHaveBeenCalled()
        console.log(response)
        expect(response.body.temperature).toBe(25.6)
    })
})

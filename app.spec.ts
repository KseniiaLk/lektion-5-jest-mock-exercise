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
describe("GET /exercise/:id", () => {

    it("should return 400 if invalid mongo id is provided", async () => {
        const response = await request(app).get("/exercise/hejhej");
        expect(response.statusCode).toBe(400);
    })
})
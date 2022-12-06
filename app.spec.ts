
import jest from 'jest';
import makeApp from './app';
import nock from 'nock';

const createExercise = jest.fn();
const getAllExercises=jest.fn();
const getExerciseById=jest.fn();

const app=makeApp(createExercise,getAllExercises,getExerciseById);

const validExercise =   {startTime:'2022-06-08' ,
    durationInSeconds: 15,
activityType: "running"}


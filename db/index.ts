import mongoose from 'mongoose';


type IExercise = {
    startTime: Date,
    durationInSeconds: Number,
    activityType: "running" | "walking" | "biking"
}

const exerciseSchema = new mongoose.Schema<IExercise>({
    startTime: Date,
    durationInSeconds: Number,
    activityType: String
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

export const createExercise = (exercise: IExercise) => {
   return new ExerciseModel(exercise);
}
export const getAllExercises = async () => {
   return await ExerciseModel.find({})
}
export const getExerciseById= (id: string) => {
   return ExerciseModel.findById(id);
}


// export default { createExercise, getAllExercises, getExerciseById }
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
   const returnValue = await ExerciseModel.find({})
   return returnValue
}
export const getExerciseById = async (id: string) => {
   try{
      const resp = await ExerciseModel.findById(id);
      return resp
   }catch(err){
      return err
   }
}

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// export default { createExercise, getAllExercises, getExerciseById }
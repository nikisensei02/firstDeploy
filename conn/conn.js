import mongoose from 'mongoose'

const conn = async(req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://nikshepch2001:Nikshep1234@todo.30hgkzm.mongodb.net/?retryWrites=true&w=majority")
        .then(()=>{
        console.log("database connected");
        })  
    } catch (error) {
        console.log(error);
    }
    
}
export default conn();
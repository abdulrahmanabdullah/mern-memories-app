import PostMessage from '../models/postSchem';

export const getPosts = async (req, res)=>{
 try {
    const collection = await PostMessage.find();
    res.status(200).json(collection);  
 } catch (error) {
    console.log(error.message); 
 }
}
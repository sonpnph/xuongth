import mongoose from "mongoose";
import dotenv from "dotenv";
const connect = async()=>{
    try{
        await mongoose.connect(dotenv.config().parsed.DB_URL);
        console.log(`Kết nối thành công`)
    }catch (error){
        console.log(`Không thể kết nối DB. lỗi ${error}`);
    }
}
export default connect;

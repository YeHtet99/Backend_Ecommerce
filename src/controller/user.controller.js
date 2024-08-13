const response = require("../config/response");
const userService = require("../service/user.service");
const login = async(req,res,next)=>{
    try{
        return res.json(
            response({
                success: true,
                payload: "login",
              })
          );
    }catch(error){
        next(error)
    }
}
module.exports={
    login
}
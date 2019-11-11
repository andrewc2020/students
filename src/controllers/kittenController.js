import connectDb from '../models/';
import Kitten from '../models/kitten';


class KittenController{

    constructor(){
       

    }
    static getAllKittens(req,res){

        
            if(connectDb()){
            Kitten.find((err,kittens)=>{

                return res.status(200).json({
                    kittens,
                    message: "All the kittens"
        
                });
    
                
            })
        }

           
            
       

        
        
       
        
        

    }
    static getSingleKitten(req,res){
        if(connectDb()){
            Kitten.findOne({_id: ObjectId("5dc930dabd59b1c1ba22afae")},(err, kitten)=>{
                return res.status(200).json({ kitten, message: "a single kitten record"})

            })
        }

    }

    
}
export default KittenController;
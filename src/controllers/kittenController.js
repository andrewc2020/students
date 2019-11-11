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
        else{
            return res.status(501);

        }

        
        
       
        
        

    }

    
}
export default KittenController;
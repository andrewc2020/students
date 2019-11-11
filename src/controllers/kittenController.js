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
        
                });  // end return
    
                
            }) //end find
        } // end if connect

    } // end method
    static getSingleKitten(req,res){
       
                return res.status(200).json({ message: "a single kitten record"})

            
        

    }

    
}
export default KittenController;
import connectDb from '../models/index';
import Kitten from '../models/kitten';


class KittenController{

    constructor(){
       

    }
    static getAllKittens(req,res){

        
        if(connectDb()){
            Kitten.find((err,kittens)=>{

                kittens;
                return res.status(200).json({
                    kittens,
                    message: "All the kittens"
        
                });
            })
            return res.status(404);

        }
        
       
        
        

    }
}
export default KittenController;
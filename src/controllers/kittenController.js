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
        if(connectDb()){
            Kitten.findById(req.params.id,(err,kitten)=>{
                return res.status(200).json({ kitten, message: "a single kitten record"})

            })
        }
       
                

            
        

    }

    static addKitten(req,res){
        if(connectDb()){
            let k = new Kitten(req.body.kitten);
            k.save((err)=>{
                if(err){return status(500)}
                
                return KittenController.getAllKittens(req,res);
            })
        }
    }

    static deleteKitten(req,res){
        if(connectDb()){
            Kitten.findById(req.params.id,(err, kitten)=>{
                Kitten.deleteOne(kitten,(err)=>{
                    if(err){return status(404)}
                    return KittenController.getAllKittens(req,res);


                })

            })
            
                

            
        }
    }

    
}
export default KittenController;
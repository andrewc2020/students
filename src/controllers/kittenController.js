
import Kitten from '../models/kitten';


class KittenController{

    constructor(){
       

    }
    static getAllKittens(req,res){

        
        
            Kitten.find((err,kittens)=>{

                return res.status(200).json({
                    kittens,
                    message: "All the kittens"
        
                });  // end return
    
                
            }) //end find
        

    } // end method
    static getAllKittensSortedByName(req,res){
       
        Kitten.find((err,kittens)=>{
            if(err){return res.status(500);}
            const sortedByName = kittens.sort((a,b) => (a.name > b.name ? 1 : -1));
            return res.status(200).json({
                sortedByName,
                message: "all the kittens sorted by name"
            })
        })

       
            
        
    }
    static getSingleKitten(req,res){
        
            Kitten.findById(req.params.id,(err,kitten)=>{
                if(!kitten){
                    return res.status(404).json({message: "kitten not found"});
                }
                return res.status(200).json({ kitten, message: "a single kitten record"})

            })
        
    
       
                

            
        

    }

    static addKitten(req,res){
        
            let k = new Kitten(req.body.kitten);
            k.save((err)=>{
                if(err){return status(500)}
                
                return KittenController.getAllKittens(req,res);
            })
        
    }

    static deleteKitten(req,res){
        
            Kitten.findById(req.params.id,(err, kitten)=>{
                Kitten.deleteOne(kitten,(err)=>{
                    if(err){return status(404)}
                    return KittenController.getAllKittens(req,res);


                })

            })
            
                

            
        
    }

    
}
export default KittenController;
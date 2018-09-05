/**
 * SingersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addSinger:  async (req, res) => {   	  // add Singer	
        try {
            console.log("addSinger");
            const {name, description, url_img} = req.body;  		
            const newSinger = await Singers.create({name, description, url_img}).fetch();  		
            res.json({
                result: "ok",
                message: "Create new Singer successfully",
                data: newSinger
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new Singer failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a singer
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Singer `
                });
                return
            }
            const Singer = await Singers.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the Singer successfully",
                data: Singer
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the Singer error: ${error}`
            });
        }  
    },
    filterSingers:  async (req, res) => {   	  	// searching for Singer
        try {
            const {nameContains} = req.params;
            const Result = await Singers.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter Singers successfully",
                data: Result
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter Singers error: ${error}`
            });
        }
    },
    deleteSinger:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Singer to delete`
                });
                return
            }
            const deletedSinger = await Singers.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedSinger
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a Singer failed: ${error}`
            });
        }  
    }, 
  
    updateSinger:  async (req, res) => {//Open "Edit Singer form"   	  	
        try {
            const {id} = req.params;   		
            const {name, description, url_img} = req.body;  		  		
            let foundSinger = await Singers.findOne({id});  		
            if (foundSinger == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Singer to update`
                });
                return
            }      	      	
            foundSinger = await Singers.update({id}, {
                name: 	name != null ? name : foundSinger.name, 
                description: 		description != null ? description : foundSinger.description, 
                url_img: 	url_img != null ? url_img : foundSinger.url_img, 
  
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a Singer successfully",
                data: foundSinger
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a Singer failed: ${error}`
            });
        }  
    },

};


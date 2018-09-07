/**
 * GenresController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addGenre:  async (req, res) => {   	  // add Genre	
        try {
            console.log("addGenre");
            const {name,songs, Genre_owner} = req.body;  		
            const newGenre = await Genres.create({name,songs, Genre_owner}).fetch();
     	      	 		
            res.json({
                result: "ok",
                message: "Create new Genre successfully",
                data: newGenre
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new Genre failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a Genre
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Genre `
                });
                return
            }
            const Genre = await Genres.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the Genre successfully",
                data: Genre
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the Genre error: ${error}`
            });
        }  
    },
    filterGenres:  async (req, res) => {   	  	// searching for Genre
        try {
            const {nameContains} = req.params;
            const Genres = await Genres.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter Genre successfully",
                data: Genres
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter Genre error: ${error}`
            });
        }
    },
    deleteGenre:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Genre to delete`
                });
                return
            }
            const deletedGenre = await Genres.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedGenre
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a Genre failed: ${error}`
            });
        }  
    }, 
  
    updateGenre:  async (req, res) => {//Open "Edit Genre form"   	  	
        try {
            const {id} = req.params;   		
            const {name,songs, Genre_owner} = req.body;  		  		
            let foundGenre = await Genres.findOne({id});  		
            if (foundGenre == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Genre to update`
                });
                return
            }      	      	
            foundGenre = await Genres.update({id}, {
                name: 	name != null ? name : foundGenre.name, 
                songs: 		songs != null ? songs : foundGenre.songs, 
                Genre_owner: 	Genre_owner != null ? Genre_owner : foundGenre.Genre_owner, 
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a Genre successfully",
                data: foundGenre
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a Genre failed: ${error}`
            });
        }  
    }, 
  

};


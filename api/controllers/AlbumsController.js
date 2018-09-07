/**
 * AlbumsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addAlbum:  async (req, res) => {   	  // add Album	
        try {
            console.log("addAlbum");
            const {name,songs, Album_owner} = req.body;  		
            const newAlbum = await Albums.create({name,songs, Album_owner}).fetch();
     	      	 		
            res.json({
                result: "ok",
                message: "Create new Album successfully",
                data: newAlbum
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new Album failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a Album
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Album `
                });
                return
            }
            const Album = await Albums.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the Album successfully",
                data: Album
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the Album error: ${error}`
            });
        }  
    },
    filterAlbums:  async (req, res) => {   	  	// searching for Album
        try {
            const {nameContains} = req.params;
            const Albums = await Albums.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter Album successfully",
                data: Albums
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter Album error: ${error}`
            });
        }
    },
    deleteAlbum:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Album to delete`
                });
                return
            }
            const deletedAlbum = await Albums.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedAlbum
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a Album failed: ${error}`
            });
        }  
    }, 
  
    updateAlbum:  async (req, res) => {//Open "Edit Album form"   	  	
        try {
            const {id} = req.params;   		
            const {name,songs, Album_owner} = req.body;  		  		
            let foundAlbum = await Albums.findOne({id});  		
            if (foundAlbum == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Album to update`
                });
                return
            }      	      	
            foundAlbum = await Albums.update({id}, {
                name: 	name != null ? name : foundAlbum.name, 
                songs: 		songs != null ? songs : foundAlbum.songs, 
                Album_owner: 	Album_owner != null ? Album_owner : foundAlbum.Album_owner, 
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a Album successfully",
                data: foundAlbum
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a Album failed: ${error}`
            });
        }  
    }, 
  

};


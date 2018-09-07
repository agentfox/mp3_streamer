/**
 * PlaylistsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addPlaylist:  async (req, res) => {   	  // add Playlist	
        try {
            console.log("addPlaylist");
            const {name,songs, playlist_owner} = req.body;  		
            const newPlaylist = await Playlists.create({name,songs, playlist_owner}).fetch();
     	      	 		
            res.json({
                result: "ok",
                message: "Create new Playlist successfully",
                data: newPlaylist
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new Playlist failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a Playlist
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Playlist `
                });
                return
            }
            const Playlist = await Playlists.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the Playlist successfully",
                data: Playlist
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the Playlist error: ${error}`
            });
        }  
    },
    filterPlaylists:  async (req, res) => {   	  	// searching for Playlist
        try {
            const {nameContains} = req.params;
            const Playlists = await Playlists.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter Playlist successfully",
                data: Playlists
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter Playlist error: ${error}`
            });
        }
    },
    deletePlaylist:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Playlist to delete`
                });
                return
            }
            const deletedPlaylist = await Playlists.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedPlaylist
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a Playlist failed: ${error}`
            });
        }  
    }, 
  
    updatePlaylist:  async (req, res) => {//Open "Edit Playlist form"   	  	
        try {
            const {id} = req.params;   		
            const {name,songs, playlist_owner} = req.body;  		  		
            let foundPlaylist = await Playlists.findOne({id});  		
            if (foundPlaylist == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Playlist to update`
                });
                return
            }      	      	
            foundPlaylist = await Playlists.update({id}, {
                name: 	name != null ? name : foundPlaylist.name, 
                songs: 		songs != null ? songs : foundPlaylist.songs, 
                playlist_owner: 	playlist_owner != null ? playlist_owner : foundPlaylist.playlist_owner, 
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a Playlist successfully",
                data: foundPlaylist
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a Playlist failed: ${error}`
            });
        }  
    }, 
  

};


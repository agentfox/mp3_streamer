/**
 * SongsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addSong:  async (req, res) => {   	  // add song	
  	try {
  		console.log("addSong");
		  const {name, url, lyric} = req.body;  		
		  const newSong = await Songs.create({name, url, lyric}).fetch();		

  		res.json({
      		result: "ok",
      		message: "Create new song successfully",
      		data: newSong
      	});
  	} catch(error) {
  		res.json({
  			result: "failed",  			
  			message: `Create new song failed: ${error}`
  		});
  	}  
  },
  findOne:  async (req, res) => {   	  	// when click on a song
  	try {
      const {id} = req.params;  	
  		if (id == null || id.length === 0) {
  			res.json({
  				result: "failed",  			
  				message: `Cannot find song `
  			});
      		return
  		}
  		const Song = await Songs.findOne({id});  		
      	res.json({
      		result: "ok",
      		message: "Query the song successfully",
      		data: Song
      	});
  	} catch(error) {  		
  		res.json({
  			result: "failed",
  			message: `Query the song error: ${error}`
  		});
  	}  
  },
  filterSongs:  async (req, res) => {   	  	// searching for song
  	try {
  		const {nameContains} = req.params;
  		const songs = await Songs.find({ 
  			name: { contains: nameContains } 
  		});  		
      	res.json({
      		result: "ok",
      		message: "Filter products successfully",
      		data: songs
      	});
  	} catch(error) {  		
  		res.json({
  			result: "failed",  			
  			message: `Filter products error: ${error}`
  		});
  	}
  },
  deleteSong:  async (req, res) => {   	  	
  	try {
  		const {id} = req.params;  	
  		if (id == null || id.length === 0) {
  			res.json({
  				result: "failed",  			
  				message: `Cannot find song to delete`
  			});
      		return
  		}
  		const deletedSong = await Songs.destroy({id}).fetch();
  		res.json({
      		result: "ok",
      		message: "Delete successfully",
      		data: deletedSong
      	});
  	} catch(error) {
  		res.json({
  			result: "failed",  			
  			message: `Delete a song failed: ${error}`
  		});
  	}  
  }, 

  updateSong:  async (req, res) => {//Open "Edit Song form"   	  	
  	try {
  		const {id} = req.params;   		
  		const {name, url, lyric} = req.body;  		  		
      	let foundSong = await Songs.findOne({id});  		
      	if (foundSong == null) {
      		res.json({
  				result: "failed",  			
  				message: `Cannot find Song to update`
  			});
      		return
      	}      	      	
  		foundSong = await Songs.update({id}, {
  			name: 	name != null ? name : foundSong.name, 
  			url: 		url != null ? url : foundSong.url, 
			lyric: 	lyric != null ? lyric : foundSong.lyric, 

  		}).fetch();  		
  		res.json({
      		result: "ok",
      		message: "Update a song successfully",
      		data: foundSong
      	});
  		
  	} catch(error) {
  		res.json({
  			result: "failed",  			
  			message: `Update a song failed: ${error}`
  		});
  	}  
  }, 

};


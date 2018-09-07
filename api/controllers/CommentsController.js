/**
 * CommentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addComment:  async (req, res) => {   	  // add Comment	
        try {
            console.log("addComment");
            const {name,songs, Comment_owner} = req.body;  		
            const newComment = await Comments.create({name,songs, Comment_owner}).fetch();
     	      	 		
            res.json({
                result: "ok",
                message: "Create new Comment successfully",
                data: newComment
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new Comment failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a Comment
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Comment `
                });
                return
            }
            const Comment = await Comments.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the Comment successfully",
                data: Comment
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the Comment error: ${error}`
            });
        }  
    },
    filterComments:  async (req, res) => {   	  	// searching for Comment
        try {
            const {nameContains} = req.params;
            const Comments = await Comments.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter Comment successfully",
                data: Comments
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter Comment error: ${error}`
            });
        }
    },
    deleteComment:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Comment to delete`
                });
                return
            }
            const deletedComment = await Comments.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedComment
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a Comment failed: ${error}`
            });
        }  
    }, 
  
    updateComment:  async (req, res) => {//Open "Edit Comment form"   	  	
        try {
            const {id} = req.params;   		
            const {name,songs, Comment_owner} = req.body;  		  		
            let foundComment = await Comments.findOne({id});  		
            if (foundComment == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find Comment to update`
                });
                return
            }      	      	
            foundComment = await Comments.update({id}, {
                name: 	name != null ? name : foundComment.name, 
                songs: 		songs != null ? songs : foundComment.songs, 
                Comment_owner: 	Comment_owner != null ? Comment_owner : foundComment.Comment_owner, 
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a Comment successfully",
                data: foundComment
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a Comment failed: ${error}`
            });
        }  
    }, 
  

};


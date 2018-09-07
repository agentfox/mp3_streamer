/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addUser:  async (req, res) => {   	  // add User	
        try {
            console.log("addUser");
            const {url_avatar,emailAddress, role, password,fullName} = req.body;  		
            const newUser = await Users.create({url_avatar,emailAddress, role, password,fullName}).fetch();
     	      	 		
            res.json({
                result: "ok",
                message: "Create new User successfully",
                data: newUser
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Create new User failed: ${error}`
            });
        }  
    },
    findOne:  async (req, res) => {   	  	// when click on a User
        try {
        const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find User `
                });
                return
            }
            const User = await Users.findOne({id});  		
            res.json({
                result: "ok",
                message: "Query the User successfully",
                data: User
            });
        } catch(error) {  		
            res.json({
                result: "failed",
                message: `Query the User error: ${error}`
            });
        }  
    },
    filterUsers:  async (req, res) => {   	  	// searching for User
        try {
            const {nameContains} = req.params;
            const Users = await Users.find({ 
                name: { contains: nameContains } 
            });  		
            res.json({
                result: "ok",
                message: "Filter User successfully",
                data: Users
            });
        } catch(error) {  		
            res.json({
                result: "failed",  			
                message: `Filter User error: ${error}`
            });
        }
    },
    deleteUser:  async (req, res) => {   	  	
        try {
            const {id} = req.params;  	
            if (id == null || id.length === 0) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find User to delete`
                });
                return
            }
            const deletedUser = await Users.destroy({id}).fetch();
            res.json({
                result: "ok",
                message: "Delete successfully",
                data: deletedUser
            });
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Delete a User failed: ${error}`
            });
        }  
    }, 
  
    updateUser:  async (req, res) => {//Open "Edit User form"   	  	
        try {
            const {id} = req.params;   		
            const {url_avatar,emailAddress, role, password,fullName} = req.body;  		  		
            let foundUser = await Users.findOne({id});  		
            if (foundUser == null) {
                res.json({
                    result: "failed",  			
                    message: `Cannot find User to update`
                });
                return
            }      	      	
            foundUser = await Users.update({id}, {
                url_avatar: 	url_avatar != null ? url_avatar : foundUser.url_avatar, 
                emailAddress: 		emailAddress != null ? emailAddress : foundUser.emailAddress, 
                role: 	role != null ? role : foundUser.role, 
                password: 	password != null ? password : foundUser.password, 
                fullName: 	fullName != null ? fullName : foundUser.fullName, 
            }).fetch();  		
            res.json({
                result: "ok",
                message: "Update a User successfully",
                data: foundUser
            });
            
        } catch(error) {
            res.json({
                result: "failed",  			
                message: `Update a User failed: ${error}`
            });
        }  
    }, 
  

};


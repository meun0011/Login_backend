const db = require('../models/db')
const {Status} = require('@prisma/client')
const {Role} = require('@prisma/client')

exports.getByUsernew = async (req, res, next) => {
  try {
    const todos = await db.todo.findMany({
      where : { userId : req.user.id}
    })
    res.json({todos})
  } catch (err) {
    next(err)
  }
}


exports.createTodonew = async (req, res, next) => {
  // validate req.body
  const data = req.body
  try{
    const rs = await db.todo.create({
       data : { ...data, userId : req.user.id}
    })
    res.json({ msg: 'Create OK' , result : rs })
  }catch(err) {
    next(err)
  }
}

exports.updateTodonew = async (req, res, next) => {
  // validate req.params + req.body
  const {id} = req.params
  const data = req.body
  try {
    const rs = await db.todo.update({
      data :  {...data},
      where: { id : +id , userId : req.user.id} 
    })
    res.json({msg: 'Update ok', result: rs})
  }catch(err){
    next(err)
  }
}

exports.deleteTodonew = async (req, res, next) => {
  const {id} = req.params
  try {
    const rs = await db.todo.delete({ where : {id : +id, userId: req.user.id}})
    res.json({msg: 'Delete ok', result : rs})
  }catch(err) {
    next(err)
  }
}

exports.getAllStatusnew = async (req, res, next) => {
  res.json({status: Object.values(Status)})
}


exports.getAllUsersadmin = async (req, res, next) => {
  try {
    const users = await db.user.findMany({
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};
// exports.getdeleteUsers = async (req, res, next) => {
//   const{id} = req.params
//   try {
//     const rs = await db.user.delete({ where : {id : +id, userId: req.user.id}})
//     res.json({msg: 'Delete ok', result : rs})
//   }catch(err) {
//     next(err)
//   }
// }


//   try {
//     const users = await db.user.delete({
//     });
//     res.json({ users });
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateUser = async (req, res, next) => {
  // validate req.params + req.body
  const {id} = req.params
  const data = req.body
  try {
    const rs = await db.todo.update({
      data :  {...data},
      where: { id : +id , userId : req.user.id} 
    })
    res.json({msg: 'Update ok', result: rs})
  }catch(err){
    next(err)
  }
}


exports.getdeleteUsersadmin = async (req, res, next) => {
    const { id } = req.params;
    try {
      // First, try to find the user by ID
      const user = await db.user.findUnique({ where: { id: parseInt(id) } });
      
      // If the user doesn't exist, return a 404 response
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If the user exists, proceed to delete it
      const rs = await db.user.delete({ where: { id: parseInt(id) } });
      
      // Return a success response
      res.status(200).json({ message: 'User deleted successfully', result: rs });
    } catch (err) {
      // Handle errors
      next(err);
    }
  };



  // exports.updateUseradminput = async (req, res, next) => {
  //   // Assuming admin verification logic is elsewhere (middleware, etc.)
  
  //   const { id } = req.params; // The ID of the user to update
  //   const data = req.body; // The updated user data
  
  //   try {
  //     // First, find the user to ensure they exist
  //     const existingUser = await db.user.findUnique({ where: { id: parseInt(id) } });
  //     if (!existingUser) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     // Update the user with the provided data
  //     const updatedUser = await db.user.update({
  //       where: { id: parseInt(id) },
  //       data: { ...data },
  //     });
  
  //     // Respond with the updated user information
  //     // Note: Adjust what you send back based on your application's privacy policy
  //     res.status(200).json({ message: 'User updated successfully', result: updatedUser });
  //   } catch (err) {
  //     // Handle potential errors
  //     next(err);
  //   }
  // };
  exports.updateUseradminput = async (req, res, next) => {
    const { id } = req.params; // Get the user ID from the URL parameter
    const { fname, username, email, role } = req.body; // Get updated user data from the request body
  
    try {
      // Find the user by ID
      const user = await db.user.findUnique({ where: { id: parseInt(id) } });
  
      // If user not found, return 404
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user with the provided data
      const updatedUser = await db.user.update({
        where: { id: parseInt(id) },
        data: { fname, username, email, role },
      });
  
      // Return the updated user
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      // Handle errors
      next(err);
    }
  };
  
  exports.getroleadmin = async (req, res, next) => {
    res.json({role: Object.values(Role)})
  }


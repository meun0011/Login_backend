const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const todoController = require('../controllers/todo-controller')

router.get('/new', authenticate, todoController.getByUsernew)
router.get('/newall-status', authenticate, todoController.getAllStatusnew)
router.post('/new', authenticate, todoController.createTodonew)
router.put('/new:id', authenticate, todoController.updateTodonew)
router.delete('/new:id', authenticate, todoController.deleteTodonew)

router.get('/adminall', authenticate, todoController.getAllUsersadmin);
router.delete('/admin:id', authenticate, todoController.getdeleteUsersadmin);
router.put('/adminput:id', authenticate, todoController.updateUseradminput)
router.get('/adminrole:id', authenticate, todoController.getroleadmin)




module.exports = router
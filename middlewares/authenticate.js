const jwt = require('jsonwebtoken')
const db = require('../models/db')

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if( !authorization ) {
      throw new Error('Unauthorized1')
    }
    if(!(authorization.startsWith('Bearer '))) {
      throw new Error('Unauthorized2')
    }
    const token = authorization.split(' ')[1]
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    console.log(payload)
    
    const user = await db.user.findFirstOrThrow({where : {id: payload.id}})
    const users = await db.user.findMany({
  where: {
    id: payload.id,
    // คุณสามารถเพิ่มเงื่อนไขเพิ่มเติมได้ตามต้องการ
    
  },
});

// ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
if (users.length === 0) {
  throw new Error('User not found');
}

// ลบข้อมูลรหัสผ่านออกจากทุกข้อมูลผู้ใช้
const sanitizedUsers = users.map(user => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
});

console.log(sanitizedUsers);

    delete user.password
    console.log(user)
    req.user = user  
    next()
    
    
  }catch(err) {
    next(err)
  }

}

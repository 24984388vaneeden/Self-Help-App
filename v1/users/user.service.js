const config = require('config.json');
const jwt = require('jsonwebtoken');
const userModel = require('./user.model');

//const config = require('../config/config.js');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    // const user = users[0];

    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function Register({firstName, lastName, email, password, confirmPassword}) {
    const mc = config.mc;

    //Todo: validate email existance in db
    //Todo: password strength validation and confirmation

    //Todo: Password hashing
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);


    mc.connect();
    
    mc.query(`INSERT INTO users values (${firstName}, ${lastName}, ${email}, ${password})`, 
        function (error, results, fields) {
            if (error) throw error;

            try{
                return results.send({ error: false, data: results, message: 'New user has been created successfully.' });
            }catch(error){

            }finally{
                mc.disconnect();
            }        
    })
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

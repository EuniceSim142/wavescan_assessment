const bcrypt = require("bcrypt");
const crypto = require("crypto");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // load in from .env file

const User = require("../models/user");

// ---------------------------------  PRIVATE FUNCTIONS  ---------------------------------
// use only within this js file.

/**
 * Hashes the plaintextPassword with salt, to be stored in the database.
 * @returns hashed and salted password
 */
const _encryptPassword = async (plaintextPassword) => {
    return await bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(plaintextPassword, salt))
            .catch(err => console.log("Error hashing password with salt"));
}

/**
 * Verifies if the 2 passwords match.
 */
const _verifyPassword = async (plaintextPassword, hashedPassword) => {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
}

const _generateUUID = () => {
    return crypto.randomUUID();
}

/**
 * Creates a JWT Token for a given {@code id}.
 * @param {UUID} id of user. 
 * @returns JWT Token.
 */
const _generateJWTToken = (id) => {
    return jwt.sign({ id: id }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: '1d'  // set jwt access token to expire in 1 day
            });
}

const _getUserByEmail = (email) => {
    return User.findOne({ where: { email: email } });
}

const _getUser = (id) => {
    return User.findOne({ where: { id: id } });
}

const _getAllUsers = () => {
    return User.findAll();
}

const isAdmin = (id) => {
    return getUser(id).then(user => user?.role == "ADMIN");
}

// ---------------------------------  PUBLIC FUNCTIONS  ---------------------------------
const register = async (req, res, next) => {
    // validate user data
    const user_data = req.body.user;

    if (user_data == null) {
        res.status(400).json({ error: `Invalid parameters for User. Unable to register.` })
    };
    

    // builds the entity
    const user = User.build({
        id: _generateUUID(),
        email: user_data.email,
        password: await _encryptPassword(user_data.password),
        role: user_data.role,
        firstName: user_data.firstName,
        lastName: user_data.lastName,
        company: user_data.company,
        designation: user_data.designation
    });

    return user.save().then(user => res.send(user));
}

const login = async (req, res, next) => {
    if (req.headers['authorization'] == null) {
        return res.status(200).send(`Already logged in!`);
    }

    const email = req.body.email;
    const password = req.body.password;

    var user = await _getUserByEmail(email);
    user = user.dataValues;

    if (!user) {
        res.status(400).json({error: `User with email (${email}) does not exist. Please register first.`});
    }

    const successfulLogin = await _verifyPassword(password, user.password);
    if (!successfulLogin) {
        res.status(400).json({error: 'Login Unsuccessful, password is incorrect.'});
    }

    return res.send({ user: user, auth_token: _generateJWTToken(user.id) });
}

const getUser = async (req, res, next) => {
    const id = req.body.id;

    const user = await _getUser(id);

    if (user == null) {
        res.status(400).json({ error: `User Entity not found. There is no User with id = ${id} in the database.` })
    }

    return res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        company: user.company,
        designation: user.designation
    });
}

const updateUser = async (req, res, next) => {
    const id = req.body.id;
    const new_user_data = req.body.user;

    var user = await _getUser(id);

    if (!user) {
        res.status(400).json({ error: `This user does not exist in the database.` });
    }

    // Update the user's fields if provided, 
    // only allowed to update these fields: firstName, lastName, password, company and designation
    user.firstName = new_user_data.firstName || user.firstName;
    user.lastName = new_user_data.lastName || user.lastName;
    user.password = await _encryptPassword(new_user_data.password) || user.password;
    user.company = new_user_data.company || user.company;
    user.designation = new_user_data.designation || user.designation;

    return user.save().then(user => res.send(user));
}

const deleteUser = async (req, res, next) => {
    const id = req.body.id;

    var user = await _getUser(id);

    return user?.destroy()
            .then(u => res.status(200).send("Successfully deleted account."))
            .catch(u => res.status(200).send("Deletion silently fails"));
}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser
}
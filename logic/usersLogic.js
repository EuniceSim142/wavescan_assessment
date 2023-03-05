const usersDb = require("../storage/usersDb")
const bcrypt = require("bcrypt");


/**
 * Class that handles the business logic of users.
 */
class UsersLogic {
    constructor() {

    }

    createUser() {

    }

    getUser() {


    }

    login() {
        const user = this.getUser();

        // Verify password
        // return JWT
    }


    /**
     * Hashes the plaintextPassword with salt, to be stored in the database.
     * @param {String} plaintextPassword 
     * @returns hashed and salted password
     */
    async encryptPassword(plaintextPassword) {
        return await bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(plaintextPassword, salt))
                .catch(err => console.log("Error hashing password with salt"));
    }

    /**
     * Verifies if the 2 passwords match.
     * @param {String} plaintextPassword 
     * @param {String} hashedPassword 
     */
    async verifyPassword(plaintextPassword, hashedPassword) {
        return await bcrypt.compare(plaintextPassword, hashedPassword);
    }
}
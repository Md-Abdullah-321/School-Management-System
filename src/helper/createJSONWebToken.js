/*
 * Title: JSON Web Token 
 * Description: Create JSON Web Token here.
 * Author: Md Abdullah
 * Date: 14/01/24
 */


//Dependencies:
const jwt = require("jsonwebtoken");

const createJSONWebToken = (payload, secretKey, expiresIn) => {
    if (typeof payload !== 'object' || !payload) {
        throw new Error("Payload must a non-empty object");
    }

    if (typeof secretKey !== 'string' || secretKey === "") {
        throw new Error("Secret key must be a non-empty string");
    }

    try {
        let token = jwt.sign(payload, secretKey, { expiresIn });

        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = createJSONWebToken;
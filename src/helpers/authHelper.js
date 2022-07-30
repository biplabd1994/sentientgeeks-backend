var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.hashPass = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            bcrypt.genSalt(10, function (err, salt) {
                if (err)
                    reject(err);

                bcrypt.hash(password, salt, function (err, hash) {
                    resolve(hash);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}
exports.comparePass = (password, hashpass) => {
    return new Promise(async (resolve, reject) => {
        try {
            bcrypt.compare(password, hashpass, function (err, isPasswordMatch) {
                return err == null ?
                    resolve(isPasswordMatch) :
                    reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });

}

exports.generateToken = (payload, expiresIn) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('payload', payload);
            let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiresIn });
            resolve(token)
        } catch (error) {
            reject(error)
        }
    });

}
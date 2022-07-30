
const authHelper = include('helpers/authHelper');
const userModel = include('models/userModel');
exports.login = async (req) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await userModel.findOne({ email: req.email, status: 'active' });
            console.log(user);
            if (!user) {
                resolve({ 'success': false, status: 302, data: [], errors: [{ message: 'Invalid email' }] });
            }
            let isMatch = await authHelper.comparePass(req.password, user.password);
            if (!isMatch) {
                resolve({ 'success': false, status: 302, data: [], errors: [{ message: 'Invalid Password' }] });
            }
            let token = await authHelper.generateToken(user.toJSON(), '1h');
            resolve({ 'success': true, status: 200, data: { token: token }, errors: [] });
        } catch (error) {
            reject(error);
        }

    })
}
exports.register = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userModel.findOne({ email: req.email });
            if (user) {
                resolve({ 'success': false, status: 302, data: [], errors: [{ message: 'Email already exists' }] });
            }
            let insertData = { name: req.name, email: req.email, password: await authHelper.hashPass(req.password) };
            await userModel.create(insertData);
            resolve({ 'success': true, status: 200, data: {}, errors: [] });
        } catch (error) {
            reject(error);
        }
    })
}
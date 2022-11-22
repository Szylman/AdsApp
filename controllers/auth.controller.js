const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try{
        const {login, password} = req.body;

        const filetype = req.file ? await getImageFileType(req.file) : 'unknown';

        if (login && 
            typeof login === 'string' && 
            password && 
            typeof password === 'string' &&
            req.file && 
            ['image/png', 'image/jpeg', 'image/gif'].includes(filetype)
            ) {
            const userWithLogin = await User.findOne({login});
            if (userWithLogin) {
                return res
                .status(409)
                .send({ message: 'User with login already exists' });
            }

            const user = await User.create({
                login, 
                password: await bcrypt.hash(password, 10),
            avatar: req.file.filename,});
            res
            .status(201)
            .send({message: 'User created successfully' + user.login});
        }
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        return res
        .status(400)
        .send({ message: 'Bad request' });

    } catch (err) {
        res
        .status(500)
        .send({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const {login, password} = req.body;

        if (login && 
            typeof login === 'string' && 
            password && 
            typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                res
                .status(404)
                .send({message:'Login or password are incorrect'});
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = {login: user.login, id: user.id};
                    res
                    .status(200)
                    .send({message: 'Login successful'});
                }
                else {
                    res
                    .status(404)
                    .send({message:'Login or password are incorrect'});
                }
            }
        }else {
            res
            .status(400)
            .send({ message: 'Bad request' });
        }
    } catch (err) {
        res
        .status(500)
        .send({ message: err.message });
    }
}


exports.getUser = async (req, res) => {
    res.send("I'm logged");
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.send( {message: 'logout'} );
}
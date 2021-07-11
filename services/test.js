const userModel = require('../models/user')
const userMapper = require('../mappers/user')
const mongoose = require('mongoose')
const fs = require('fs')

const setUser = async (user, model) => {
    if (model.name) {
        user.name = model.name
    }
    if (model.phone) {
        user.phone = model.phone
    }
}

const get = async (id, res) => {
    let user = await getById(id)
    user = await userMapper.toModel(user)
    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(200).json({
            message: 'User Not Found'
        })
    }
}

exports.get = get

const getById = async (id) => {
    let user = await userModel.findById(id)
    if (user) {
        return user
    }
    return null
}

exports.getById = getById

const create = async (model, res) => {
    const user = await new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: model.name,
        email: model.email,
        phone: model.phone
    })

    await user.save().then(async result => {
        let newUser = await userMapper.toModel(result)
        console.log('User Created')
        return res.status(200).json(newUser)
    })
}

exports.create = create

const update = async (id, model, res) => {
    let user = await getById(id)

    await setUser(user, model)

    user.save()
    console.log('User Updated')
    return res.status(200).json(user)
}

exports.update = update

const remove = async (id, res) => {
    let user = await getById(id)
    await user.remove().then(() => {
        return res.status(200).json({
            message: 'User Deleted'
        })
    }).catch((err) => {
        return res.status(404).json({
            error: err
        })
    })
}

exports.remove = remove

const search = async (query, res) => {
    var filename = __dirname + '../../amit.jpg';

    var readStream = fs.createReadStream(filename);

    readStream.on('open', function () {
        return readStream.pipe(res);
    });
    // fs.writeFile('thumbnail.jpeg', { my binary stream }, 'binary',
    //     function (err) {
    //         if (err) throw err;
    //         console.log('File saved.')
    //     })
    // let where = {}
    // if (query.name) {
    //     where['name'] = query.name
    // }
    // if (query.phone) {
    //     where['phone'] = query.phone
    // }
    // if (query.email) {
    //     where['email'] = query.email
    // }
    // let items = await userModel.find(where)

}

exports.search = search
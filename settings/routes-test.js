const express = require('express')
const apiRoutes = express.Router()
const userService = require('../services/test')

apiRoutes.get('/:userID', async (req, res, next) => {
    console.log('user get')
    const id = req.params.userID;
    console.log(id)
    res = await userService.get(id, res)
    return res
})

apiRoutes.get('', async (req, res, next) => {
    const query = req.query
    console.log(query)
    res = await userService.search(query, res)
    return res
})

apiRoutes.post('/', async (req, res, next) => {
    console.log('user POST')
    res = await userService.create(req.body, res)
    return res
})

apiRoutes.patch('/:userID', async (req, res, next) => {
    console.log('user patch')
    const id = req.params.userID;
    res = await userService.update(id, req.body, res)
    return res
})

apiRoutes.delete('/:userID', async (req, res, next) => {
    console.log('user patch')
    const id = req.params.userID;
    res = await userService.remove(id, res)
    return res
})

module.exports = apiRoutes
import db from '../models/index';
import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errMessage: "Missing inputs parameter"
        })
    }
    let userData = await userService.handleLoginUser(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user || {},
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: [],
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users,
    })
}

let handleCreateNewUser = async (req, res) => {
    let massage = await userService.createNewUser(req.body);
    return res.status(200).json(massage)
}

let handleEditUser = async (req, res) => {
    let massage = await userService.updateUserData(req.body);
    return res.status(200).json(massage)
}

let handleDeleteUser = async (req, res) => {
    console.log("req", req.body.id);
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing requied parameter!"
        })
    }
    let massage = await userService.deleteUser(req.body.id);
    return res.status(200).json(massage)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
}
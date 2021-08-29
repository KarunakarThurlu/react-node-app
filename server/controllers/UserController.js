const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcryptjs");
const JWTUtil = require("../utils/JWTUtil");
const jwt = require("jsonwebtoken");


//login
exports.login = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email }).populate("roles");
        if (user === null)
            return response.json({ data: request.body, statusCode: 400, "message": request.body.email + " is not Found in our database. Please signup!." });
        let validpassword = await bcrypt.compare(request.body.password, user.password);
        if (!validpassword)
            return response.json({ data: request.body, statusCode: 400, "message": "Invalid UserName Or Password!" });

        let foo = user;
        delete foo.password;
        const token = jwt.sign({ sub: user.email }, JWTUtil.JWTCONSTANTS.CLIENT_SECRET, { expiresIn: JWTUtil.JWTCONSTANTS.TOKEN_EXPIRES_IN, issuer: JWTUtil.JWTCONSTANTS.ISSUER });
        return response.json({ data: foo, statusCode: 200, message: "Login Success!", token: token });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
};

exports.saveUser = async (request, response, next) => {
    try {
        let userExists = await User.findOne({ email: request.body.email });
        if (userExists)
            return response.json({ data: request.body, statusCode: 400, message: `Email ${request.body.email} Already Exists` });
        let roles = [];
        if (request.body.roles.length !== 0) {
            let rolesFromUI = request.body.roles;
            for (let role of rolesFromUI) {
                let roleExisted = await Role.findOne({ role_name: role.role_name });
                if (roleExisted === null) {
                    const count = await Role.find().countDocuments();
                    let r = new Role({ role_name: role.role_name, roleId: count + 1 });
                    roleExisted = await r.save();
                    roles.push(roleExisted._id);
                } else {
                    roles.push(roleExisted._id);
                }
            }
        }

        let userObj = new User({
            name: request.body.name,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            company: "60c454963a835c5100f85998",
            password: bcrypt.hashSync(request.body.password, 10),
            gender: request.body.gender,
            roles: roles
        });
        await userObj.save();
        return response.json({ data: userObj, statusCode: 200, message: "User Saved" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getUserById = async (request, response, next) => {
    try {
        let user = await User.findOne({ _id: request.query.id }).populate('roles');
        if (user)
            return response.json({ "data": user, "statusCode": "200", "message": "User Saved" });
        else
            return response.json({ "data": {}, "statusCode": "400", "message": "not found" });
    } catch (error) {
        return response.json({ "data": {}, "statusCode": "500", "message": error.message });
    }
}

exports.getAllUsers = async (request, response, next) => {
    try {
        const pageNumber = request.body.pageNumber || 0;
        const pageSize = request.body.pageSize || 10;
        const totalCount = await User.find().countDocuments();
        const users = await User.find({}, { password: false, roles: false })
            .populate({ path: "company", select: ["name", "companyId"] })
            .skip(pageNumber)
            .limit(pageSize);
        if (users)
            return response.json({ data: users, totalCount: totalCount, pageNumber: pageNumber, pageSize: pageSize, statusCode: 200, message: "OK" });
        else
            return response.json({ data: {}, statusCode: 400, message: "not found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.updateUser = async (request, response, next) => {
    try {
        const userFromDB = await User.findOne({ _id: request.body._id });
        if (userFromDB) {
            //updating user fields
            let keys = Object.keys(request.body);
            keys.pop("roels"); keys.pop("_id");
            keys.map((v, i) => {
                userFromDB._doc[keys[i]] = request.body[v];
            });

            //updating user roles
            let roles = [];
            if (request.body.roles.length !== 0) {
                let rolesFromUI = request.body.roles;
                for (let role of rolesFromUI) {
                    let roleExisted = await Role.findOne({ role_name: role.role_name });
                    if (roleExisted === null) {
                        let r = new Role({ role_name: role.role_name });
                        roleExisted = await r.save();
                        roles.push(roleExisted._id);
                    } else {
                        roles.push(roleExisted.id);
                    }
                }
            }
            userFromDB.roles = roles;
            const updateduser = await User.findByIdAndUpdate({ _id: request.body._id }, userFromDB, (error, doc, res) => { });
            response.json({ "data": updateduser, "statusCode": "200", "message": "User Saved" });
        }
        else
            return response.json({ "data": {}, "statusCode": "400", "message": "not found" });
    } catch (error) {
        return response.json({ "data": {}, "statusCode": "500", "message": error.message });
    }
}

exports.deleteUserById = async (request, response, next) => {
    try {
        await User.findByIdAndDelete({ _id: request.query.id });
        response.json({ "data": {}, "statusCode": "200", "message": "User deleted" });
    } catch (error) {
        response.json({ "data": "", "statusCode": "500", "message": error.message })
    }
}

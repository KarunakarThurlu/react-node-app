const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcryptjs");
const JWTUtil = require("../utils/JWTUtil");
const jwt = require("jsonwebtoken");
const GetUserFromToken = require("../utils/GetUserDetailsFromToken");
const fs = require("fs");
var multer = require('multer');



//login
exports.login = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email }).populate("roles");
        if (user === null)
            return response.json({ data: request.body, statusCode: 400, "message": request.body.email + " is not Found in our database. Please signup!." });
        let validpassword = await bcrypt.compare(request.body.password, user.password);
        if (!validpassword)
            return response.json({ data: request.body, statusCode: 400, "message": "Invalid UserName Or Password!" });

        user.password = undefined;
        const token = jwt.sign({ sub: user.email }, JWTUtil.JWTCONSTANTS.CLIENT_SECRET, { expiresIn: JWTUtil.JWTCONSTANTS.TOKEN_EXPIRES_IN, issuer: JWTUtil.JWTCONSTANTS.ISSUER });
        return response.json({ data: user, statusCode: 200, message: "Login Success!", token: token });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
};



exports.uploadProfilePicture = async (request, response, next) => {
    const requestUser = await GetUserFromToken.getUserDetailsFromToken(request);
    try {
        const url = request.protocol + '://' + request.get('host')
        let userFromDB = await User.findOne({ _id: requestUser._id });
        if (userFromDB) {
            //delete old image
            if (userFromDB.profilePicture) {
                let oldImagePath = "uploads/" + userFromDB.profilePicture.split("uploads/")[1];
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            await User.findByIdAndUpdate({ _id: requestUser._id }, { $set: { profilePicture: url + '/uploads/' + request.file.filename } });
            let updatedUser = await User.findOne({ _id: requestUser._id }, { password: false }).populate('roles');
            return response.json({ data: updatedUser, statusCode: 200, message: "Profile Picture Uploaded Successfully!" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "User Not Found!" });
        }
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
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            password: bcrypt.hashSync(request.body.password || "Welcome@123", 10),
            gender: request.body.gender,
            roles: roles
        });
        await userObj.save();
        return response.json({ data: userObj, statusCode: 200, message: "User Saved" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.changePassword = async (request, response, next) => {
    try {
        const requestUser = await GetUserFromToken.getUserDetailsFromToken(request);
        let userFromDB = await User.findOne({ _id: requestUser._id });
        if (userFromDB) {
            let validpassword = await bcrypt.compare(request.body.currentPassword, userFromDB.password);
            if (!validpassword)
                return response.json({ data: request.body, statusCode: 400, message: "Current Password is Invalid!" });
            await User.findByIdAndUpdate({ _id: requestUser._id }, { $set: { password: bcrypt.hashSync(request.body.newPassword, 10) } });
            return response.json({ data: {}, statusCode: 200, message: "Password Changed Successfully!" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "User Not Found!" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
exports.getUserById = async (request, response, next) => {
    try {
        let user = await User.findOne({ _id: request.query.id }).populate('roles');
        if (user)
            return response.json({ data: user, statusCode: 200, message: "User Saved" });
        else
            return response.json({ data: {}, statusCode: 400, message: "not found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getAllUsers = async (request, response, next) => {
    try {
        const pageNumber = parseInt(request.query.pageNumber) - 1 || 0;
        const pageSize = parseInt(request.query.pageSize) || 5;
        const totalCount = await User.find().countDocuments();
        const users = await User.find({}, { password: false })
            .populate({ path: "company", select: ["name", "companyId"] })
            .populate({ path: "roles", select: ["role_name", "roleId"] })
            .skip(pageNumber * pageSize)
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
            userFromDB['updatedOn'] = new Date().toISOString();
            //updating user roles
            let roles = [];
            if (request.body.roles !== undefined && request.body.roles.length !== 0) {
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
            response.json({ data: updateduser, statusCode: 200, message: "Updated Successfully" });
        }
        else
            return response.json({ data: {}, statusCode: 400, message: "not found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.deleteUserById = async (request, response, next) => {
    try {
        const userFromDB = await User.findOne({ _id: request.query.id });
        if(userFromDB){
            //change status to INACTIVE
            await User.findByIdAndUpdate({ _id: request.query.id }, { $set: { status: "INACTIVE" } });
            return response.json({ data: {}, statusCode: 200, message: "Deleted Successfully" });
        }else{
            return response.json({ data: {}, statusCode: 400, message: "not found" });
        }
    } catch (error) {
        response.json({ data: "", statusCode: "500", message: error.message })
    }
}

exports.getUsersDataForVisualization = async (request, response, next) => {

    try {
        //get allusers groupby status
        let roles=await Role.find();
        let users = await User.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
        //groupby and project with role_name
        let usersWithRoles = await User.aggregate([{ $group: { _id: "$roles", count: { $sum: 1 } } }])
                                       .project({_id: 0,role_name: "$_id",count: 1});  

        let usersStatusCount =[]
        let count=0;
          users.map((v,i)=>{
              let obj={}
               obj['name'] = v._id; 
               obj['y'] = v.count; 
               usersStatusCount.push(obj);
               count=count+v.count;
         });
         usersStatusCount.push({name:'TOTAL',y:count});
        let usersWithRolesCount =[]
        usersWithRoles.map((v,i)=>{ 
            let rolesArray=[]
            let roleIds = v.role_name;
            if(roleIds.length===1){
                let roleObj = roles.find(x=>x._id.toString()===roleIds[0].toString());
                if(roleObj.role_name==='USER'){
                    rolesArray.push(roleObj.role_name);
                    rolesArray.push(v.count);
                    usersWithRolesCount.push(rolesArray);
                }
            }else if(roleIds.length===2){
                let roleNameOne = roles.find(x=>x._id.toString()==roleIds[0].toString()).role_name;
                let roleNameTwo = roles.find(x=>x._id.toString()==roleIds[1].toString()).role_name;
                if(roleNameOne==='ADMIN' || roleNameTwo==='ADMIN'){
                    rolesArray.push('ADMIN');
                    rolesArray.push(v.count);
                    usersWithRolesCount.push(rolesArray);
                }
            }
         });
        let res = { users: usersStatusCount, usersWithRoles: usersWithRolesCount }
        return response.json({ data: res, statusCode: 200, message: "OK" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

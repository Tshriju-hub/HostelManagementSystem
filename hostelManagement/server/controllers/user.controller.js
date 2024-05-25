const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { throwError } = require('rxjs');

async function insert(user) {
    user.hashedPassword = bcrypt.hashSync(user.newPassword, 10);
    delete user.password;
    user.username = user.newUsername;
    // Make a mongoose db call to save user in db
    console.log('Saving user to db', user);
    return await new User(user).save();
}

async function getUserByUsernameAndPassword(currentUsername, currentPassword) {
    try {
        let user = await User.findOne({ username: currentUsername });
        if (isUserValid(user, currentPassword, user.hashedPassword)) {
            user = user.toObject();
            delete user.hashedPassword;
            return user;
        } else {
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        return throwError(() => new Error('Error fetching user: ' + error.message));
    }
}

async function getUserById(id) {
    try {
        let user = await User.findById(id);
        if (user) {
            user = user.toObject();
            delete user.hashedPassword;
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        return throwError(() => new Error('Error fetching user by ID: ' + error.message));
    }
}

async function getAllUser() {
    try {
        let users = await User.find({});
        if (users) {
            return users;
        } else {
            throw new Error('No users found');
        }
    } catch (error) {
        return throwError(() => new Error('Error fetching all users: ' + error.message));
    }
}

async function updateUser(user) {
    try {
        let userMatch = await User.findOne({ username: user.username });
        if (isUserValid(userMatch, user.password, userMatch.hashedPassword)) {
            return await User.updateOne(
                { username: user.username },
                {
                    $set: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        mobileNumber: user.mobileNumber,
                        email: user.email
                    }
                }
            );
        } else {
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        return throwError(() => new Error('Error updating user: ' + error.message));
    }
}

function isUserValid(user, currentPassword, hashedPassword) {
    return user && bcrypt.compareSync(currentPassword, hashedPassword);
}

module.exports = {
    insert,
    getUserByUsernameAndPassword,
    getUserById,
    getAllUser,
    updateUser
};

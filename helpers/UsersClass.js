const user = require("../models/user");

class Users {
    constructor(){
        this.users =  [];
    }

    AddUserData(id, name, room){
        var users = {id, name, room};
        this.users.push(users);
        return users;
    }

    GetUsersList(room){
        var users =  this.users.filter((user) => {
            return user.room === room;
        });

        var namesArry = users.map((user) => {
            return user.name;
        });

        return namesArry;

    }
}

module.exports = {Users};
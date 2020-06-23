// const User = require("../helpers/User");
// const { load } = require("../container");
const util = require('util');

module.exports = function(){
    return {
        SetRouting: function(router){
            router.get('/group/:name', this.groupPage)
        },

        groupPage: function(req, res){

             const name = req.params.name;
            // // var dataUserSS = req.user.name;

            // // console.log("t test " + dataUserSS);
            // // console.log("t test " + req.session);
            
            
            // console.log(`SAODJASLKJD:l ${util.inspect(req.user)}`)
            
            res.render('groupchat/group', {title:'Group Chat', user: req.user, groupName:name});
            
            
        }
    }
    
}
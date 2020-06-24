
module.exports = function(async, Group, _, Users, Message, FriendResult){
  return {
    SetRouting: function(router){
      router.get('/home', this.homepage);
      router.post('/home', this.postHomePage);
      
      router.get('/logout', this.logout);
    },

    homepage: function(req, res){
      async.parallel([
        function(callback){
            Group.find({}, (err, result) => {
                callback(err, result);
                
            })
        },
        
        function(callback){
            Group.aggregate([
                { $group: { _id: "$carrera" } }
            ], (err, newResult) => {
               callback(err, newResult) ;
               
            });
        },

        function(callback){
          Users.findOne({'username': req.user.username})
          .populate('request.userId')
          .exec((err, result) => {
            callback(err, result);
          })
        },

        function(callback){
          const nameRegex = new RegExp("^" + req.user.username.toLowerCase(), "i");
          Message.aggregate([
              {$match: {$or: [{'senderName': nameRegex}, {'receiverName': nameRegex}]}},
              {$sort: {'createdAt': -1}},
              {
                  $group:{ "_id":{
                      "last_message_between":{
                          $cond: [
                              {
                                  $gt:[
                                      {$substr: ["$senderName", 0, 1]},
                                      {$substr: ["$receiverName", 0, 1]}]
                              },                                        
                              {$concat: ["$senderName", " and ", "$receiverName"]},
                              {$concat: ["$receiverName", " and ", "$senderName"]}
                          ]
                      }   
                  }, "body": {$first: "$$ROOT"}
              }
              }], function(err, newResult){
                  callback(err, newResult);
              }
          )
      },

      ], (err, results) => {
        const res1 = results[0];
        const res2 = results[1];
        const res3 = results[2];
        const res4 = results[3];
        
        const dataChunk = [];
        const chunkSize = 3;

        for(let i = 0; i < res1.length; i += chunkSize){
          dataChunk.push(res1.slice(i, i+chunkSize));
        }


        const carreraSort = _.sortBy(res2, '_id');

        res.render('home', {title: 'Chat Client - Server', user:req.user, chunks: dataChunk, carrera: carreraSort, data: res3, chat: res4});
      })

    },

    postHomePage: function(req, res){
      async.parallel([
          function(callback){
            Group.updateOne({
              '_id': req.body.id,
              'members.username': {$ne: req.user.username}
            }, {
              $push: {members: {
                  username: req.user.username,
                  email: req.user.email
              }}
            }, (err, count) => {
              callback(err, count);
            });
          },
        ], (err, results) => {
          res.redirect('/home');
        });

        FriendResult.PostRequest(req, res, '/home');

    },

    logout: function(req, res){
      req.logout();
      req.session.destroy((err) =>{
        res.redirect('/');
      }); 
    }



  }
}

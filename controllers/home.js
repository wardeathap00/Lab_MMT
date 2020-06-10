module.exports =  function(async, Group, _){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
        },

        homePage: function(req, res){
           async.parallel([
               function(callback){
                   Group.find({}, (err, result) => {
                       callback(err, result);
                   })
               },

               function(callback){
                    Group.aggregate([{
                         $group:{
                            _id: "$number"
                        }
                    }], (err, newResult) => {
                        callback(err, newResult);
                    });
               }
           ], (err, result) => {
               const res1 = result[0];
               const res2 = result[1];
               //console.log(res1);
               //console.log(res2);               
               
               const dataChunk = [];
               const chunkSize = 2;
               for (let i = 0; i < res1.length; i+=chunkSize) {
                   dataChunk.push(res1.slice(i, i+chunkSize));
               } 

               //console.log(dataChunk);
               

               res.render('home', {title: 'Homepage', data: dataChunk});
           })           
        },




    }
} 
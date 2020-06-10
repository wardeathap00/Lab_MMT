const path = require('path'); //dẫn file để lưu
const fs = require('fs'); //đọc file

module.exports = function(formidable, Group) {
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },

        adminPage: function(req, res){
            res.render('admin/dashboard');
        },

        adminPostPage: function(req, res){
            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.number = req.body.number;
            newGroup.image = req.body.upload;
            newGroup.save((err) =>{
                res.render('admin/dashboard');
            })
        },

        uploadFile: function(req, res){
            const form = formidable.IncomingForm();
            form.uploadDir = path.join(__dirname, '../public/uploads');
            // rename vì file đổi thành tên mặc định
            form.on('file', (field, file) => {
                fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                    if (err) throw err;
                    console.log('rename suc');
                })
            });
            //kiểm tra lỗi
            form.on('error', (err) => {
                console.log(err)
            });
            //check upload xong
            form.on('end', () => {
                console.log('suc upload');
            });

            form.parse(req);
        }

    }
}
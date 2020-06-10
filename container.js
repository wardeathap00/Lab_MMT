const dependable = require("dependable");
const path = require("path");


const container = dependable.container();

//khai báo 1 cái mảng array chứa tên các thư viện
const simpleDependencies = [
    ['_','Lodash'],
    ['passport', 'passport'],
    ['formidable', 'formidable'],
    ['async', 'async'],
    ['Group','./models/group'],
   
    
];

//khi vòng lặp chạy, khi gọi _ hàm sẽ trả về Lodash
simpleDependencies.forEach(function(val){
    container.register(val[0],  function(){
        return require(val[1]);
    })
});

//tạo đường dẫn đến các thư mục, đăng ký các file trong thư mục đó và cả thư mục đó
container.load(path.join(__dirname,'/controllers'));
container.load(path.join(__dirname,'/helpers'));

// đăng ký container để export và sử dụng, nôm na chỉ cần gọi container là nó  bao gồm các thư viện và file đã được khai báo trong đây
container.register('container', function(){
    return container;
});

//export moudule để sử dụng
module.exports = container;
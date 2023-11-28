const path=require("path")
class uploadRepository{
    async checkFileType(file,cb){
        const fileTypes=/jpeg|jpg|png|gif|svg/; // Allow file extension
        //check extension name
        const extName=fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimeType =fileTypes.test(file.mimeType)
        if (mimeType && extName) {
            return cb(null, true);
          } else {
            cb("Error: You can Only Upload Images!!");
          }
    }
}

module.exports=new uploadRepository()
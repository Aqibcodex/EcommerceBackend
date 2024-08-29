import multer from "multer"
 const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
        
    },
 filename:(req,file,cb)=>{
    cb(null,Date.now()+file.originalname)
 }
  })
   const upload = multer({
      storage:storage,
      limits: { fileSize: 1000000 },
      fileFilter(req, file, cb) {
         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'))
            }
            // the true mean file is valid and its type is acccepted 
            cb(null, true)
         }
   })
   export default upload
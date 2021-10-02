import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    let filetype: string = ''
    switch (file.mimetype) {
      case 'image/jpg':
      case 'image/jpeg':
        filetype = 'jpg'
        break
      case 'image/gif':
        filetype = 'gif'
        break
      case 'image/png':
        filetype = 'png'
        break
    }
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + filetype)
  },
})
export default multer({ storage })

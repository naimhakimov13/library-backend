import { Router } from 'express'
import multer from 'multer'

import { uploadFile } from '../controllers/upload.controller.js'

const router = Router()

const upload = multer({
  limits: {
    fileSize: 10e+6
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error('Please upload a valid file, for example .jpg, .jpeg, .png or .pdf'))
    }
    cb(undefined, true)
  },
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req, file, callback) {
      const extension = file.mimetype.split('/')[1]
      const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension
      callback(null, fileName)
    }
  })
})

router.post('/', upload.single('file'), uploadFile)

export default router

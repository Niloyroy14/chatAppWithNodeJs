// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");


function uploader(subfolder_path, allowed_file_types, max_file_size, error_msg) {
    //File upload folder
    UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();

            cb(null, fileName + fileExt);
        },
    });



    //prepare the final multer upload object
    const upload = multer({
        //dest: UPLOADS_FOLDER,
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, callback) => {
            if (allowed_file_types.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(createError(error_msg));
            }
        }
    });


    return upload;
}



module.exports = uploader;
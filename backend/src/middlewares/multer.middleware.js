import multer from "multer";
import fs from "fs"; // ⬅️ Added to handle file system operations
import path from "path"; // ⬅️ Added for absolute path resolution

// Use path.resolve for a robust absolute path from the project root
const uploadDir = path.resolve('./public/temp'); 

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true to create nested directories if needed
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the guaranteed-to-exist absolute path
  },
  filename: function (req, file, cb) {
    // A better approach is to use unique file names to avoid collisions:
    // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    // But for now, keeping the original:
    cb(null, file.originalname);
  }
});
  
export const upload = multer({ 
    storage,
     
})
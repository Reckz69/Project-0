import { Router } from "express";
import { 
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishedStatus,
    getVideoViews,
    searchVideos
 } from "../controllers/videos.controllers.js";

 import { verifyJWT } from "../middlewares/auth.middleware.js";
 import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/search", searchVideos);

router.use(verifyJWT);

// GET all videos, CREATE video
router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 }
    ]),
    publishVideo
  );




// specific routes FIRST
router.patch("/views/:videoId", getVideoViews);
router.patch("/toggle/:videoId", togglePublishedStatus);

// dynamic route LAST
router
  .route("/:videoId")
  .get(getVideoById)
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideo);

export default router;

    

    


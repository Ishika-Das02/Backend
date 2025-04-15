import { Router } from "express";
import { getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js"; // loginUser function is not defined in the provided code
import { logoutUser } from "../controllers/user.controller.js"; // logoutUser function is not defined in the provided code
import { registerUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { changeCurrentPassword } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser) 

// secured routes
router.route("/logout").post(verifyJWT, logoutUser) 
router.route("/refresh-token").post(refreshAccessToken) 
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserAvatar)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // get user channel profile by username
router.route("history").get(verifyJWT, getWatchHistory) // get watch history

export default router
const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getPosts);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["BusinessPeople", "Investor", "Banker", "BusinessAdvisor"]),
  createPost
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["BusinessPeople", "Investor", "Banker", "BusinessAdvisor"]),
  updatePost
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["BusinessPeople", "Investor", "Banker", "BusinessAdvisor"]),
  deletePost
);

module.exports = router;

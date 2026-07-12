const express = require("express");
const router = express.Router();

const { home, testPost } = require("../controllers/testController");

router.get("/home", home);
router.post("/test-post", testPost);

module.exports = router;
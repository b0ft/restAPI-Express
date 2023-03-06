var express = require("express");
var router = express.Router();

const {
    getAll,
    getById,
    create,
    update,
    destroy,
} = require("../controllers/product");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;

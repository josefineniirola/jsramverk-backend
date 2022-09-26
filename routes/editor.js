var express = require('express');
var router = express.Router();
const editorModel = require("../models/editor");

router.get('/',
    async (req, res) => {
        const edits = await editorModel.getAllEdits();
    
        return res.json({
            data: edits
        });
    }
);


router.post("/",
    async (req, res) => {
        const newEditor = req.body;

        const result = await editorModel.insertEdit(newEditor);

        return res.status(201).json({ data: result});
    }
);

router.put("/",
    async (req, res) => {
        const editEditor = req.body;
        const result = await editorModel.editEdits(editEditor);

        return res.status(201).json({ data: result, msg: "Succefully edited: "});
    }
);

router.delete("/",
    async (req, res) => {
        const deletedId = req.body;
        const result = await editorModel.deleteEdit(deletedId);
        console.log(deletedId);
        return res.status(201).json({ data: result, msg: "Succefully deleted: "});
    }
);


module.exports = router;

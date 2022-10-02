var express = require('express');
var router = express.Router();
const editorModel = require("../models/editor");
const database = require("../db/database.js");
const ObjectId = require('mongodb').ObjectId;


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
        const putId = req.body._id;
        const filter = { _id: ObjectId(putId) };

        let db;
        try {
            db = await database.getDb();
            const result = await db.collection.updateOne(filter, 
                { $set: { 
                    name: req.body.name, 
                    text: req.body.text 
                    }
                });
            return res.status(201).json({ data: result, msg: "got a put request "});
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }
);

// router.delete("/",
//     async (req, res) => {
//         const deletedId = req.body;
//         console.log(deletedId);
//         let filter = { _id: ObjectId(deletedId) };
        
//         let db;
//         try {
//             db = await database.getDb();
//             const result = await db.collection.deleteOne({filter});
//             return res.status(201).json({ data: result, msg: "gOT A Delete request: "});
//         } catch (error) {
//             console.error(error.message);
//         } finally {
//             await db.client.close();
//         }
//     }
// );


module.exports = router;

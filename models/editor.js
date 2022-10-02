const database = require("../db/database.js");
const ObjectId = require('mongodb').ObjectId;


const editorModel  = {
    getAllEdits: async function getAllEdits() {
        let db;

        try {
            db = await database.getDb();

            const allEdits = await db.collection.find().toArray();

            return allEdits;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },
    insertEdit: async function insertEdit(newEdit) {
        let db;

        try {
            db = await database.getDb();
            const result = await db.collection.insertOne(newEdit);
            console.log(result);
            return {
                ...newEdit,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    editEdits: async function editEdits(updateEdit) {
        const filter = { _id: ObjectId(updateEdit._id) };

        let db;
        try {
            db = await database.getDb();
            await db.collection.updateOne(
                filter, 
                {
                    $set: {
                        name: updateEdit.name,
                        text: updateEdit.text
                    },
                },
                { upsert: false });
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    // deleteEdit: async function deleteEdit(deletedId) {
    //     let filter = { _id: ObjectId(deletedId._id) };
    //     let db;
    //     try {
    //         db = await database.getDb();
    //         console.log("updaete", deletedId)
    //         await db.collection.deleteOne(filter);
    //     } catch (error) {
    //         console.error(error.message);
    //     } finally {
    //         await db.client.close();
    //     }
    // },
    init: async function init() {
        let db;
        try {
            db = await database.getDb();

            const result = await db.collection.insertMany(initEditor);

            console.log(`${result.insertedCount} documents were inserted`);
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }
}

module.exports = editorModel;

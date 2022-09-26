const database = require("../db/database.js");


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
        let db;
        try {
            db = await database.getDb();
            console.log("updaete", updateEdit)
            const result = await db.collection.updateOne({
                id: updateEdit.id
            }, {
                $set: {
                    "id": updateEdit.id,
                    "name": updateEdit.name,
                    "text": updateEdit.text
                }
            });
            console.log("result: ", result)
            return result;

        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    deleteEdit: async function deleteEdit(deletedId) {
        let db;
        try {
            db = await database.getDb();
            console.log("updaete", deletedId)
            const result = await db.collection.deleteOne({
                id: deletedId.id
            });
            console.log("result: ", result)
            return result;

        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
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

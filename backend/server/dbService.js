const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');

let instance = null;
require('dotenv').config();
const uri = process.env.MONGO_URI;//uri to database
const client = new MongoClient(uri);

class DbService{

    /**
    * @returns an instance of the database if it exists else returns a new instance
    */
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    /**
    * Creates a new entry of a job application in the database that adds the current time as date applied and defaults to "applied" status
    * @param name - name of the job position
    * @param company - name of the company
    * @param location - location of job
    * @param pay - the pay range of the job if available
    */
    async createNewEntry(name, company, location, pay){
        try{
            await client.connect();

            await client.db("jobApps").collection("applications").insertOne(
                {
                    name : name,
                    company : company,
                    location : location,
                    pay : pay,
                    time : new Date(),
                    status : "applied"
                }
            );
        } catch(err) {
            console.log(err);
        } finally {
            await client.close();
        }
    }

    /**
    * @return result - all entries in the database
    */
    async returnAllEntry() {
        try{
            await client.connect();

            const result = await client.db("jobApps").collection("applications").find().toArray();
            await client.close();
            return result;
        } catch(err) {
            console.log(err);
        }
    }

    /**
    * changes the current status of an entry to a new status
    * @param id - id of the entry to be changed
    * @param newStatus - value to replace the previous status
    */
    async editEntry(id, newStatus){
        try {
            await client.connect();

            await client.db("jobApps").collection("applications").updateOne(
                {_id : new ObjectId(id)},
                {$set:{status : newStatus}}
            );
        } catch(err) {
            console.log(err);
        } finally {
            await client.close();
        }
    }

    /**
    * deletes a single entry in the database
    * @param id - id of the entry to be deleted
    */
    async deleteEntry(id) {
        try{
            await client.connect();

            await client.db("jobApps").collection("applications").deleteOne({_id : new ObjectId(id)});
            await client.close();
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = DbService;
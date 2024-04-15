const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://georgeon2016:LOqN46m3VkjVwWDS@fugazi.o4zk7a1.mongodb.net/?retryWrites=true&w=majority&appName=Fugazi"
);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

module.exports = {
  connectToDb: run,
  client: client,
};

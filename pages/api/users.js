import clientPromise from "../../lib/mongodb";

export default async (req, res) => {

    if (req.method === 'POST') {
        // Process a POST request
        console.log("request body >>>>>>");
        console.log(req.body);
        try {
            const client = await clientPromise;
            const db = client.db("mygrocerylist");
            const post = await db.collection("portfoliomessages").insertOne(req.body);
            res.json(post);
        } catch (e) {
            console.error(e);
            throw new Error(e).message;
        }


    } else {
        try {
            const client = await clientPromise;
            const db = client.db("mygrocerylist");
            const movies = await db
                .collection("portfoliomessages")
                .find({})
                .sort({ metacritic: -1 })
                .limit(10)
                .toArray();

            res.json(movies);
        } catch (e) {
            console.error(e);
        }
    }


};
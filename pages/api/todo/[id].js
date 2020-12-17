// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
});

export default async (req, res) => {
    const connection = await mongoose.createConnection(
        "mongodb://admin:pass@localhost:27017/admin",
        {
            useNewUrlParser: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
        }
    );

    try {
        const Todo = connection.model("Todo", TodoSchema);
        const { query: { id }, method } = req

        switch (method) {
            case "DELETE":
                const isRemove = await Todo.remove({ _id: id })
                res.status(200).json(isRemove)
                connection.close();
                break;
            default:
                res.setHeader("Allow", ["DELETE"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        connection.close();
        res.status(500).json({ error: e.message || "something went wrong" });
    }
};
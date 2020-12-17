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
    const { body: { title, done }, method } = req

    switch (method) {
      case "GET":
        const todo = await Todo.find({})
        res.status(200).json(todo)
        connection.close();
        break;
      case "POST":
        Todo.create({ title, done }, (error, todo) => {
          if (error) {
            connection.close();
            res.status(500).json({ error });
          } else {
            res.status(200).json(todo);
            connection.close();
          }
        });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};
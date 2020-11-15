import nc from "next-connect";
import * as yup from "yup";

import middleware from "../../middlewares/middleware";
import authenticate from "../../middlewares/auth";

const handler = nc();

//! For Global Middlewares
const base = nc().use(middleware);
//! Route Specific Middlewares
const auth = nc().post("api/secure", authenticate);

handler
  .use(base)
  .use(auth)
  .get(async (req, res) => {
    try {
      const todos = await req.db.collection("todos").find({}).toArray();
      res.status(200).send(todos);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, description } = req.body;
      const todo = await req.db
        .collection("todos")
        .insertOne({
          title,
          description,
        })
        .then(({ ops }) => ops[0]);
      res.status(200).json(todo);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  });

export default handler;

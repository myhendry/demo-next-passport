import nextConnect from "next-connect";

import middleware from "../../middlewares/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await req.db
    .collection("users")
    .insertOne({
      email: "ohendry@email.com",
    })
    .then(({ ops }) => ops[0]);
  console.log(user);
  res.status(201).send("Done");
});

export default handler;

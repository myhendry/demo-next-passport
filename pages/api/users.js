import nc from "next-connect";
import bcrypt from "bcryptjs";
import * as yup from "yup";

import middleware from "../../middlewares/middleware";
import yupValidator from "../../middlewares/yupValidator";
import { extractUser } from "../../lib/api-helpers";

// Mount an instance of next-connect
// const common = nc().use(midd1).use(midd2); // You may have some common middleware to be used in every route.
// const auth = nc().use('/dashboard', checkAuth);
// const subapp = nc().get(getHandle).post('/baz', postHandle);
// handler
//   .use(common) // `midd1` and `midd2` runs everywhere
//   .use(auth) // `checkAuth` runs on /dashboard/*
//   .use('/foo', subapp); // `getHandle` runs on /foo while `postHandle` runs on /foo/baz

const userSchema = yup.object().shape({
  name: yup.string().trim().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(5, "must be more than 5 words la"),
});

const handler = nc();

//! Route Specific Middlewares
const validation = nc().post("/api/users", yupValidator(userSchema));
//! For Global Middlewares
const base = nc().use(middleware);

handler
  .use(base)
  .use(validation)
  .post(async (req, res) => {
    //! Apply yupValidator for this route only
    const { name, email, password } = req.body;
    // check if email existed
    if ((await req.db.collection("users").countDocuments({ email })) > 0) {
      res.status(403).send("The email has already been used.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await req.db
      .collection("users")
      .insertOne({ email, password: hashedPassword, name })
      .then(({ ops }) => ops[0]);
    req.logIn(user, (err) => {
      if (err) throw err;
      // when we finally log in, return the (filtered) user object
      res.status(201).json({
        user: extractUser(req),
      });
    });
  })
  .get(async (req, res) => {
    //! yupValidator not applied to this get route
    console.log(req);
  })
  .put(async (req, res) => {
    //! yupValidator not applied to this put route
    const { name, password } = req.body;
    console.log(name, password);
    res.status(201).send("Done");
  });

export default handler;

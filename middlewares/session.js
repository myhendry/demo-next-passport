import session from "express-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

export default function sessionMiddleware(req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });

  return session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })(req, res, next);
}

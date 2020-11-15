import passport from "../lib/passport";

export default function authMiddleware(req, res, next) {
  if (!req.user) return res.send("You are not authenticated");
  return next();
}

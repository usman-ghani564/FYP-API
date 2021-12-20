import {NextFunction, Request, Response} from "express";

/**
 * Return whether the user is authorized or not.
 * @param {Map} opts The role of the user and more.
 * @param {Response} res The response of query.
 * @return {Function}  Next function to be called.
 */
export function isAuthorized(opts: {
  hasRole: Array<"admin" | "worker" | "user">;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {role, email, uid} = res.locals;
    const {id} = req.params;

    if (opts.allowSameUser && id && uid === id) return next();

    if (email === "your-root-user-email@domain.com") return next();

    if (!role) return res.status(403).send();

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send();
  };
}

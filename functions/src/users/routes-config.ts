import {Application} from "express";
import {all, create, get, patch, remove} from "./controller";
import {isAuthenticated} from "../auth/authenticated";
import {isAuthorized} from "../auth/authorized";

/**
 * @param {Application} app application param
 * This function configures the routes
 */
export function routesConfig(app: Application) {
  app.post(
      "/users",
      isAuthenticated,
      isAuthorized({hasRole: ["admin", "worker"]}),
      create
  );
  // lists all users
  app.get("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "worker"]}),
    all,
  ]);
  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "worker"], allowSameUser: true}),
    get,
  ]);
  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "worker"], allowSameUser: true}),
    patch,
  ]);
  // deletes :id user
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "worker"]}),
    remove,
  ]);
}

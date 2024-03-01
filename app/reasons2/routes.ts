import { router } from "@mongez/warlock";
import { guardedAdmin, publicRoutes } from "app/utils/router";
import getReasons2 from "./controllers/get-reasons2";
import getReasons2s from "./controllers/get-reasons2s";
import restfulReasons2s from "./controllers/restful-reasons2s";

guardedAdmin(() => {
  router.restfulResource("/reasons2s", restfulReasons2s);
});

publicRoutes(() => {
  router.get("/reasons2s", getReasons2s);
  router.get("/reasons2s/:id", getReasons2);
});

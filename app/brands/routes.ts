import { router } from "@mongez/warlock";
import { guardedAdmin, publicRoutes } from "app/utils/router";
import getBrand from "./controllers/get-brand";
import getBrands from "./controllers/get-brands";
import restfulBrands from "./controllers/restful-brands";

guardedAdmin(() => {
  router.restfulResource("/brands", restfulBrands);
});

publicRoutes(() => {
  router.get("/brands", getBrands);
  router.get("/brands/:id", getBrand);
});

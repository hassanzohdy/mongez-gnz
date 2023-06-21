import { publicRoutes } from "apps/apps/utils/router";
import URLS from "apps/apps/utils/urls";
import UserDetailsPage from "./pages/UserDetailsPage";
import UsersPage from "./pages/UsersPage";

publicRoutes([
  {
    path: URLS.users.list,
    component: UsersPage,
  },
  {
    path: URLS.users.viewRoute,
    component: UserDetailsPage,
  },
]);

import endpoint from "shared/endpoint";

/**
 * Get Users list
 */
export function getUsersList(params: any = {}) {
  return endpoint.get("/users", {
    params,
  });
}

/**
 * Get users details
 */
export function getUser(id: string | number) {
  return endpoint.get("/users/" + id);
}

import type { Request, RequestHandler, Response } from "@mongez/warlock";

// Pass the User Type to RequestHandler to define what the current user type is from accessing request.suer object
// i.e RequestHandler<User>
const handy2: RequestHandler = async (request: Request, response: Response) => {
  // your code here

  return response.success({});
};

handy2.description = "Handy2";

import {
  type Request,
  type RequestHandler,
  type Response,
} from "@mongez/warlock";
import reasons2sRepository from "../repositories/reasons2-repository";

// Pass the User Type to RequestHandler to define what the current user type is from accessing request.suer object
// i.e RequestHandler<User>
const getReasons2: RequestHandler = async (
  request: Request,
  response: Response,
) => {
  const reasons2 = await reasons2sRepository.get(request.int("id"));

  if (!reasons2) {
    return response.notFound();
  }

  return response.success({
    reasons2,
  });
};

getReasons2.description = "Get Reasons2 handler";

export default getReasons2;

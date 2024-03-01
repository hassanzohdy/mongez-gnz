import {
  type Request,
  type RequestHandler,
  type Response,
} from "@mongez/warlock";
import reasons2sRepository from "../repositories/reasons2-repository";

// Pass the User Type to RequestHandler to define what the current user type is from accessing request.suer object
// i.e RequestHandler<User>
const getReasons2s: RequestHandler = async (
  request: Request,
  response: Response,
) => {
  const { documents: reasons2s, paginationInfo } =
    await reasons2sRepository.listActive(request.all());

  return response.success({
    reasons2s,
    paginationInfo,
  });
};

getReasons2s.description = "Get Reasons2s handler";

export default getReasons2s;

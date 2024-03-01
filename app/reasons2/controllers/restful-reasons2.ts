import { Restful, RouteResource } from "@mongez/warlock";
import { Reasons2 } from "./../models/reasons2";
import reasons2sRepository from "./../repositories/reasons2-repository";

class RestfulReasons2s extends Restful<Reasons2> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = reasons2sRepository;

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {
      rules: {},
    },
  };
}

const restfulReasons2s = new RestfulReasons2s();
export default restfulReasons2s;

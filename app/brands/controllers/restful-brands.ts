import { Restful, RouteResource } from "@mongez/warlock";
import { Brand } from "./../models/brand";
import brandsRepository from "./../repositories/brands-repository";

class RestfulBrands extends Restful<Brand> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = brandsRepository;

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {
      rules: {},
    },
  };
}

const restfulBrands = new RestfulBrands();
export default restfulBrands;

import {
  FilterByOptions,
  RepositoryManager,
  RepositoryOptions,
} from "@mongez/warlock";
import { Brand } from "./../models/brand";

export class BrandsRepository extends RepositoryManager<Brand> {
  /**
   * {@inheritDoc}
   */
  public model = Brand;

  /**
   * List default options
   */
  protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

  /**
   * Filter By options
   */
  protected filterBy: FilterByOptions = this.withDefaultFilters({});
}

const brandsRepository = new BrandsRepository();

export default brandsRepository;

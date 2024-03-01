import {
  FilterByOptions,
  RepositoryManager,
  RepositoryOptions,
} from "@mongez/warlock";
import { Reasons2 } from "./../models/reasons2";

export class Reasons2sRepository extends RepositoryManager<Reasons2> {
  /**
   * {@inheritDoc}
   */
  public model = Reasons2;

  /**
   * List default options
   */
  protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

  /**
   * Filter By options
   */
  protected filterBy: FilterByOptions = this.withDefaultFilters({});
}

const reasons2sRepository = new Reasons2sRepository();

export default reasons2sRepository;

import { Request, Response } from "@mongez/warlock";
import brandsRepository from "../repositories/brands-repository";

export default async function getBrands(request: Request, response: Response) {
  const { documents: brands, paginationInfo } =
    await brandsRepository.listActive(request.all());

  return response.success({
    brands,
    paginationInfo,
  });
}

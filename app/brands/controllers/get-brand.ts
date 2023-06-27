import { Request, Response } from "@mongez/warlock";
import brandsRepository from "../repositories/brands-repository";

export default async function getBrand(request: Request, response: Response) {
  const brand = await brandsRepository.get(request.int("id"));

  if (!brand) {
    return response.notFound();
  }

  return response.success({
    brand,
  });
}

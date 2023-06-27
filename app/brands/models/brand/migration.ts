import { Brand } from "./brand";

export const BrandBluePrint = Brand.blueprint();

export async function brandMigration() {
  await BrandBluePrint.unique("id");
}

brandMigration.blueprint = BrandBluePrint;

brandMigration.down = async () => {
  await BrandBluePrint.dropUniqueIndex("id");
};

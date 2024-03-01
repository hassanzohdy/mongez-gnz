import { type Migration } from "@mongez/monpulse";
import { Reasons2 } from "./reasons2";

export const Reasons2BluePrint = Reasons2.blueprint();

export const reasons2Migration: Migration = async () => {
  Reasons2BluePrint.unique("id");
};

reasons2Migration.blueprint = Reasons2BluePrint;

reasons2Migration.down = async () => {
  Reasons2BluePrint.dropUniqueIndex("id");
};

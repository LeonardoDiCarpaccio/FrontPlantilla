import { ComparableEntity } from "qedal-ts";
import { SyneviewOrganization } from "./Organisation";
import { SyneviewScreen } from "./Screen";

export class SyneviewGroupScreen extends ComparableEntity {
  Organization? : SyneviewOrganization;
  Screens : SyneviewScreen[] = [];

}

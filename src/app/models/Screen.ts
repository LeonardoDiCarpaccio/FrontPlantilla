import { BaseOrganization, ComparableEntity } from "qedal-ts";
import { TypeStateScreen } from "./Enums/TypeStateScreen";
import { SyneviewOrganization } from "./Organisation";

export class SyneviewScreen extends ComparableEntity {

  State : TypeStateScreen = TypeStateScreen.OFF;
  Organization? : SyneviewOrganization;
  Key : string = "";



}

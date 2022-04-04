import { BaseAddress } from "qedal-ts";
import { SyneviewOrganization } from "./Organisation";
import { SyneviewTaxonomy } from "./Taxonomy";
import { SyneviewPerson } from "./Person";

export class SyneviewAddress extends BaseAddress<SyneviewAddress,SyneviewOrganization,SyneviewPerson,SyneviewTaxonomy> {

}

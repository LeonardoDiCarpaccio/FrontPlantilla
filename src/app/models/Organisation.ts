import { BaseOrganization } from "qedal-ts";
import { SyneviewAddress } from "./Address";
import { SyneviewTaxonomy } from "./Taxonomy";
import { SyneviewPerson } from "./Person";

export class SyneviewOrganization extends BaseOrganization<SyneviewOrganization,
SyneviewAddress,SyneviewPerson,SyneviewTaxonomy> {

}

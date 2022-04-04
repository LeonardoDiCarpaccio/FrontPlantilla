import { AppRole, AppUser, BaseAddress, BaseOrganization, BasePerson, BaseTaxonomyItem } from "qedal-ts";
import { SyneviewAddress } from "./Address";
import { SyneviewOrganization } from "./Organisation";
import { SyneviewTaxonomy } from "./Taxonomy";

export class SyneviewPerson extends BasePerson<SyneviewPerson,SyneviewOrganization,SyneviewAddress,SyneviewTaxonomy> {
    constructor(){
      super()
      this.User = new AppUser()
      this.User.UserRoleCollection = []
    }
}

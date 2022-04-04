import { Interval } from "luxon";
import { ComparableEntity, Media } from "qedal-ts";
import { TimeInterval } from "rxjs/internal/operators/timeInterval";
import { TypeStateBroadcast } from "./Enums/TypeStateBroadcast";
import { SyneviewGroupScreen } from "./GroupScreen";
import { SyneviewScreen } from "./Screen";

export class SyneviewBroadcast extends ComparableEntity {
  DateStart? : Date ;
  DateEnd? : Date ;
  Screens : SyneviewScreen[] = [];
  GroupScreens : SyneviewGroupScreen[] = [];
  Order : number = 0;
  State : TypeStateBroadcast = TypeStateBroadcast.STOPPED;
  Medias : Media[] = [];
  TimeStampStart : Interval[] = [];
  TimeStampEnd : Interval[] = [];
  Random : boolean = false;
}

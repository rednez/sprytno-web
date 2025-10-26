import { UserPrivateDetails } from './user-private-details';
import { UserPublicDetails } from './user-public-details';

export interface Me {
  id: string;
  publicDetails: UserPublicDetails;
  privateDetails: UserPrivateDetails;
  isProfileCompleted: boolean;
}

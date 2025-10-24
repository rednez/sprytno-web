import { UserPrivateDetails } from './user-private-details';
import { UserPublicDetails } from './user-public-details';

export interface User {
  id: string;
  publicDetails: UserPublicDetails;
  privateDetails: UserPrivateDetails | null;
}

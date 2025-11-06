import CompleteProfileDynamicView from '@/components/features/profile/complete-profile-dynamic-view';
import { Suspense } from 'react';

export default function CompleteProfile() {
  return (
    <Suspense>
      <CompleteProfileDynamicView />
    </Suspense>
  );
}

import { CompleteProfileForm } from '@/components/features/profile';
import { verifyProfileCompletion } from '@/lib/repositories';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { redirect } from 'next/navigation';

export default async function CompleteProfileDynamicView() {
  const isProfileCompleted = await verifyProfileCompletion();
  if (isProfileCompleted) {
    redirect('/');
  }

  return (
    <Card className="max-w-md m-auto mt-4">
      <CardHeader>
        <h4 className="text-lg font-medium">Complete Profile</h4>
      </CardHeader>

      <CardBody>
        <CompleteProfileForm />
      </CardBody>
    </Card>
  );
}

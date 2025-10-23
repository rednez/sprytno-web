import { redirect } from 'next/navigation';

export default async function Tasks() {
  redirect('/tasks/explore');
}

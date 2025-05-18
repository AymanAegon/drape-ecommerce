import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/products');
  return null; // redirect will prevent this from rendering
}

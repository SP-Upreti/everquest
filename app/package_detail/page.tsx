"use client";

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Dynamically import PackageDetailMain with lazy loading
const PackageDetailMain = dynamic(() => import('@/components/website/PackageDetail/PackageDetailMain'), {
  loading: () => <Loading/> 
});

function Page() {
  const params=useParams()
  return (
    <main className="bg-white z-[20] relative">
      <PackageDetailMain slug={params.slug as string} />
    </main>
  );
}

export default Page;

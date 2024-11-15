"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from 'next-auth/react';
export default function Header() {
    const { data: status } = useSession();

  return (
    <header className="bg-gray-800 p-4 h-[10vh]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Code Guard
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/quality" className="text-white hover:text-gray-300">Quality</Link></li>
            <li><Link href="/toggle-linting" className="text-white hover:text-gray-300">Toggle linting</Link></li>
            <li><Link href="/generate" className="text-white hover:text-gray-300">Generate Key</Link></li>
          </ul>
        </nav>
        {
            status ? (
              <div className='flex justify-center items-center gap-3'>
                <Link href='/projects'><Button variant="secondary" size={"lg"} className='font-semibold text-gray-800'>Projects</Button></Link>
                <Button variant="secondary" size={"lg"} className='font-semibold text-gray-800' onClick={()=>signOut()}>Sign out</Button>
              </div>
            ) : (
                <Button variant="secondary" size={"lg"} className='font-semibold text-gray-800' onClick={()=>signIn()}>Sign in</Button>
            )
        }
      </div>
    </header>
  );
}
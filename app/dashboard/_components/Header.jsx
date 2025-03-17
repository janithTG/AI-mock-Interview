"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path = usePathname();

    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logo.svg'} width={30} height={60} alt='logo'/>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
                ${path== '/dashboard' && 'text-orange-500 font-bold'}`}>Dashboard</li>
            <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
                ${path== '/dashboard/questions' && 'text-orange-500 font-bold'}`}>Questions</li>
            <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
                ${path== '/dashboard/upgrade' && 'text-orange-500 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
                ${path== '/dashboard/howitworks' && 'text-orange-500 font-bold'}`}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
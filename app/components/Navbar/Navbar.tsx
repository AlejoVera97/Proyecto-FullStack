'use client'
import Link from 'next/link'
import { GiBigWave, GiSurferVan } from 'react-icons/gi'
import { FaHouseFloodWater } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function SideNav() {
  const links = [
    { name: 'Home', href: '/', icon: <FaHouseFloodWater /> },
    {
      name: 'Praia Do Rosa 2025',
      href: '/praia-do-rosa',
      icon: <GiSurferVan />,
    },
    {
      name: 'Ranking',
      href: '/ranking',
      icon: <GiBigWave />,
    },
  ]
  const pathname = usePathname()
  return (
    <div className="h-16 w-full fixed inline-flex flex-row bg-slate-100 shadow-md lg:h-screen lg:w-64 lg:flex-col z-50">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-full lg:h-[48px] grow items-center justify-center gap-2 bg-slate-100 p-3 text-sm text-slate-700 font-medium hover:bg-slate-700 hover:text-white active:bg-slate-800 lg:flex-none lg:justify-start lg:p-2 lg:px-3',
              { 'bg-slate-700 text-white': pathname === link.href }
            )}
          >
            <div className="text-2xl">{link.icon}</div>
            <p className="hidden lg:block">{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}
{
  /* <PiWavesLight className="w-6" /> */
}

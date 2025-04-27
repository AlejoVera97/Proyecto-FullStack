'use client'
import { useState } from 'react'
import { Accommodation } from '../../lib/definitions'
import { IoIosArrowUp } from 'react-icons/io'
import ButtonIcon from '../ui/ButtonIcon'
import { FaPenToSquare, FaTrash, FaPlus } from 'react-icons/fa6'
import UserTag from './UserTag'

interface AccommodationCardProps {
  accommodation: Accommodation
}

export default function AccommodationCard({
  accommodation: { title, href, description, price },
}: AccommodationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white overflow-hidden shadow rounded-2xl px-4 py-5 w-full text-slate-700">
      <div className="flex items-center">
        <div className="ml-4 w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold ">{title}</h3>{' '}
            <div className="flex justify-end space-x-2">
              <ButtonIcon
                icon={<FaPenToSquare />}
                onClick={() => {}}
                size="small"
              />
              <ButtonIcon icon={<FaTrash />} onClick={() => {}} size="small" />
            </div>
          </div>

          <p className="text-sm ">{price}</p>
        </div>
      </div>

      <div className="mt-2 ml-4">
        <div className="flex items-center justify-between">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-sky-700 hover:text-sky-800 active:text-slate-700"
          >
            Visit Website
          </a>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-base cursor-pointer hover:text-slate-500 flex justify-between items-center"
          >
            <span> {isExpanded ? 'Ver menos' : 'Ver más'}</span>
            <IoIosArrowUp
              className={`${
                isExpanded ? 'rotate-0' : 'rotate-180'
              } transition duration-300 ease-in-out ml-1`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 w-full">
            <p className="text-sm text-slate-600">{description}</p>

            <div className=" flex justify-between items-end space-x-4">
              <div className="flex flex-wrap mt-4">
                <UserTag className="mr-2" label="Lucho" />
                <UserTag label="Agus" />
              </div>
              <ButtonIcon
                className="bg-slate-700 hover:bg-slate-300 transition duration-200 ease-in-out text-white w-8 h-8 flex items-center justify-center rounded-2xl"
                size="small"
                icon={<FaPlus />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { FaCarSide, FaTrash, FaPenToSquare } from 'react-icons/fa6'
import { UserTripData } from '../../lib/definitions'
import ButtonIcon from '../ui/ButtonIcon'

interface TimelineListProps {
  usersTripData: UserTripData[]
  startRangeDate: Date
  days: Date[]
  onEditUser: (user: UserTripData) => void
  onDelete: (user: UserTripData) => void
}

export default function TimelineList({
  usersTripData,
  startRangeDate,
  days,
  onEditUser,
  onDelete,
}: TimelineListProps) {
  return (
    <div className="mt-2 space-y-3 relative">
      {usersTripData.map((userTripData) => {
        if (!userTripData.startDate || !userTripData.endDate) {
          console.error(`Missing date for ${userTripData.name}`)
          return null
        }

        const userStart = new Date(userTripData.startDate)
        const userEnd = new Date(userTripData.endDate)

        if (isNaN(userStart.getTime()) || isNaN(userEnd.getTime())) {
          console.error(`Invalid date format for ${userTripData.name}`)
          return null
        }
        const left =
          ((userStart.getTime() - startRangeDate.getTime()) /
            (1000 * 60 * 60 * 24)) *
          (100 / days.length)
        const width =
          ((userEnd.getTime() - userStart.getTime()) / (1000 * 60 * 60 * 24) +
            1) *
          (100 / days.length)

        return (
          <div
            key={userTripData.id}
            className="grid grid-cols-[50px_1fr_50px] md:grid-cols-[100px_1fr_100px] items-center border-b-[1px] border-gray-300 pb-2"
          >
            <span className="text-sm md:text-base font-bold text-gray-700 mr-2 flex flex-wrap">
              {userTripData.name}
              {userTripData.car && (
                <FaCarSide className="text-yellow-600 text-xl md:text-2xl ml-2 self-center" />
              )}
            </span>
            <div className="ml-2 flex-1 relative h-6 rounded-lg overflow-hidden bg-gray-200">
              <div
                className={`absolute top-0 h-6 rounded-sm ${
                  userTripData.confirmed ? 'bg-emerald-600' : 'bg-red-300'
                }`}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                }}
              ></div>
            </div>
            <div className="flex gap-2 self-end justify-self-end">
              <ButtonIcon
                icon={<FaPenToSquare />}
                onClick={() => onEditUser(userTripData)}
                size="medium"
              />
              <ButtonIcon
                icon={<FaTrash />}
                onClick={() => onDelete(userTripData)}
                size="medium"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

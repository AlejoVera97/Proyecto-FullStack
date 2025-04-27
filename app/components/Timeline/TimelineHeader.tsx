interface TimelineHeaderProps {
  days: Date[]
}

const TimeLineHeader: React.FC<TimelineHeaderProps> = ({ days }) => {
  return (
    <div>
      {/* Timeline Header */}
      <div className="relative grid grid-cols-[50px_1fr_50px] md:grid-cols-[100px_1fr_100px] items-center justify-between">
        <span className="mr-2 text-sm text-gray-700 self-center justify-self-end">
          Abril
        </span>
        <div className="relative border-t border-gray-500 mx-2">
          <div className="absolute top-0 w-full flex justify-between">
            {days.map((day, index) => (
              <div key={index} className="relative w-1 text-center">
                <div
                  className={`${day.getDate() % 5 === 0 ? 'block' : 'hidden'}
                  ${index % 2 === 0 ? 'md:block' : 'md:hidden'}
                   absolute -top-4 text-xs font-medium text-gray-700`}
                >
                  {day.getDate()}
                </div>
                <div className="w-[1px] h-1 bg-gray-500 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        <span className="ml-2 text-sm text-gray-700 self-center justify-self-start">
          Mayo
        </span>
      </div>
    </div>
  )
}

export default TimeLineHeader

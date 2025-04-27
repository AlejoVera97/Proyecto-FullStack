import { Accommodation } from '../../lib/definitions'
import AccommodationCard from './AccommodationCard'
import SectionTitle from '../ui/SectionTitle'
import { PiIsland } from 'react-icons/pi'
import Button from '../ui/Button'
interface AccommodationsSectionProps {
  accommodations: Accommodation[]
}
export default function AccommodationsSection({
  accommodations,
}: AccommodationsSectionProps) {
  return (
    <div className="w-full flex flex-col space-y-16 items-center">
      <SectionTitle
        title="Alojamientos"
        description="Aca van las opciones de alojamiento que estuvimos viendo, algunas ya estan marcadas quienes van"
        icon={<PiIsland />}
      />
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </div>
      </div>
      <Button label="Agregar opción" className="mt-6" />
    </div>
  )
}

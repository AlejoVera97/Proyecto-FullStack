import { GiSurferVan } from 'react-icons/gi'
import { PiAirplaneInFlight } from 'react-icons/pi'
import { fetchUsersTripData, fetchAccommodations } from './lib/data'
import { UserTripData, Accommodation } from './lib/definitions'
import SectionTitle from './components/ui/SectionTitle'
import TripCard from './components/ui/TripCard'
import Container from './components/ui/Container'

export default async function Page() {
  // Se ejecuta en el servidor y trae la data de la base
  const usersTripData: UserTripData[] = await fetchUsersTripData()
  const accommodations: Accommodation[] = await fetchAccommodations()
  return (
    <div>
      <Container className="h-screen w-full flex flex-col items-center justify-center">
        <SectionTitle
          icon={<PiAirplaneInFlight />}
          title="Próximos viajes"
          description="De momento solo tenemos un viaje confirmado, pero no te preocupes, la temporada de verano/otoño 2025 en Praia Do Rosa se viene con todo. ¿Preparados?"
        />
        <div className="text-slate-500 font-bold text-sm md:text-base mt-10 mb-4">
          Estos son nuestros próximos viajes:
        </div>
        <TripCard
          icon={<GiSurferVan />}
          title="Un Picado en el Emir se va Praia"
          description="En busca de buenas olas y buenos mares, nos escapamos del picado punta esteño que nos caracteriza para salir de neustra zona de confort: ola glass, piscina con olas artificales, risas, amigos, drogas, sexo y rock and roll, son solo algunas de las cosas que nos esperan en este viaje."
          href="/praia-do-rosa"
        />
      </Container>
    </div>
  )
}

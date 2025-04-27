// pages/index.tsx (Server Component)
import AccommodationsSection from '../components/Accommodations/AccommodationsSection'
import Timeline from '../components/Timeline/Timeline'
import TransportationSection from '../components/Transportation/TransportationSection'
import Container from '../components/ui/Container'
import { fetchUsersTripData, fetchAccommodations } from '../lib/data'
import { UserTripData, Accommodation } from '../lib/definitions'

export default async function Page() {
  // Se ejecuta en el servidor y trae la data de la base
  const usersTripData: UserTripData[] = await fetchUsersTripData()
  const accommodations: Accommodation[] = await fetchAccommodations()
  return (
    <div className="h-full w-full flex flex-col space-y-16 md:space-y-26 py-36 items-center">
      <Container>
        <Timeline initialUsersTripData={usersTripData} />
      </Container>
      <Container>
        <AccommodationsSection accommodations={accommodations} />
      </Container>
      <Container>
        <TransportationSection />
      </Container>
    </div>
  )
}

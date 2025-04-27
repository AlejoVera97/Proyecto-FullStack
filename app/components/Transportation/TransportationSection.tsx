import SectionTitle from '../../components/ui/SectionTitle'
import { GiSurferVan } from 'react-icons/gi'
const TransportationSection = () => {
  return (
    <div className="w-full flex flex-col space-y-16 items-center">
      <SectionTitle
        title="Transporte"
        description="Cuando te sumas a un auto tus fechas se ajustan a las del dia de salida y vuelta del auto seleccionado."
        icon={<GiSurferVan />}
      />
    </div>
  )
}

export default TransportationSection

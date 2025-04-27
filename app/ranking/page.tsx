import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import { GiBigWave } from 'react-icons/gi'
const page = () => {
  return (
    <Container className="h-screen w-full flex flex-col items-center justify-center">
      <SectionTitle
        icon={<GiBigWave />}
        title="Ranking UPEEE"
        description="Se define el final de temporada verano/otoño 2025 en Praia Do Rosa. ¿Preparados?"
      />
      <div className="text-slate-500 font-bold text-sm md:text-base mt-10 mb-2">
        Próximamente...
      </div>
      <Button
        label="Quiero participar"
        color="primary"
        variant="solid"
        size="medium"
        isDisabled={true}
        className="hover:bg-slate-700 cursor-default"
      />
    </Container>
  )
}

export default page

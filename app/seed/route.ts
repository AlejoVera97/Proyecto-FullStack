import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

// Helper function to convert dates to UTC
function toUTC(dateString: string): string {
  const localDate = new Date(`${dateString}T00:00:00-03:00`) // Interpret as GMT-3
  return localDate.toISOString().split('T')[0] // Convert to UTC and format as YYYY-MM-DD
}

// Función para crear la tabla UserTripData
async function createUserTripDataTable() {
  try {
    console.log('Eliminando tabla UserTripData si existe...')
    await sql`DROP TABLE IF EXISTS userTripData CASCADE;`

    console.log('Creando tabla UserTripData...')
    await sql`
      CREATE TABLE userTripData (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        confirmed BOOLEAN NOT NULL,
        car BOOLEAN NOT NULL,
        CONSTRAINT unique_userstay UNIQUE (name, startDate, endDate)
      );
    `
    console.log('Tabla UserTripData creada con la restricción UNIQUE.')
  } catch (error) {
    console.error('Error en createUserTripDataTable:', error)
    throw error
  }
}
// Función para crear extensiones necesarias
async function createExtensions() {
  try {
    console.log('Creando extensiones necesarias...')
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    console.log('Extensiones creadas.')
  } catch (error) {
    console.error('Error al crear extensiones:', error)
    throw error
  }
}

// Función para sembrar datos en la tabla UserTripData
async function seedUserTripData() {
  const usersTripData = [
    {
      name: 'Rama',
      startDate: toUTC('2025-04-26'),
      endDate: toUTC('2025-05-19'),
      confirmed: true,
    },
    {
      name: 'Peter',
      startDate: toUTC('2025-04-26'),
      endDate: toUTC('2025-05-19'),
      confirmed: true,
    },
    {
      name: 'Lucho',
      startDate: toUTC('2025-05-05'),
      endDate: toUTC('2025-05-19'),
      confirmed: true,
      car: true,
    },
    {
      name: 'Kako',
      startDate: toUTC('2025-04-26'),
      endDate: toUTC('2025-05-10'),
      confirmed: false,
    },
  ]
  try {
    console.log('Eliminando datos existentes...')
    await sql`DELETE FROM userTripData;`

    console.log('Insertando datos...')
    const insertedUsersTripData = await Promise.all(
      usersTripData.map(async (userTripData) => {
        console.log('Insertando:', userTripData)
        const result = await sql`
          INSERT INTO userTripData (name, startDate, endDate, confirmed, car)
          VALUES (${userTripData.name}, ${userTripData.startDate}, ${
          userTripData.endDate
        }, ${userTripData.confirmed}, ${userTripData.car ?? false})
          RETURNING *;
        `
        console.log('Resultado del INSERT:', result)
        return result
      })
    )

    console.log('Datos insertados:', insertedUsersTripData)
    return insertedUsersTripData
  } catch (error) {
    console.error('Error en seedUserTripData:', error)
    throw error
  }
}
async function createAccommodationUsersTable() {
  try {
    console.log('Eliminando tabla AccommodationUsers si existe...')
    await sql`DROP TABLE IF EXISTS accommodation_users CASCADE;`

    console.log('Creando tabla AccommodationUsers...')
    await sql`
      CREATE TABLE accommodation_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        accommodation_id UUID NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES userTripData(id) ON DELETE CASCADE,
        UNIQUE (accommodation_id, user_id) -- Evitar duplicados
      );
    `
    console.log('Tabla AccommodationUsers creada.')
  } catch (error) {
    console.error('Error en createAccommodationUsersTable:', error)
    throw error
  }
}

async function createAccommodationsTable() {
  try {
    console.log('Eliminando tabla Accommodations si existe...')
    await sql`DROP TABLE IF EXISTS accommodations CASCADE;`

    console.log('Creando tabla Accommodations...')
    await sql`
      CREATE TABLE accommodations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        href VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(50) NOT NULL
      );
    `
    console.log('Tabla Accommodations creada.')
  } catch (error) {
    console.error('Error en createAccommodationsTable:', error)
    throw error
  }
}

// Función para sembrar datos en la tabla Accommodations
async function seedAccommodations() {
  const accommodations = [
    {
      title: 'Casa de Playa Azul',
      href: 'https://example.com/casa-playa-azul',
      description: 'Una hermosa casa frente al mar con 3 habitaciones.',
      price: '150 USD por noche',
    },
    {
      title: 'Cabaña en el Bosque',
      href: 'https://example.com/cabana-bosque',
      description: 'Cabaña acogedora rodeada de naturaleza.',
      price: '120 USD por noche',
    },
    {
      title: 'Apartamento Moderno',
      href: 'https://example.com/apartamento-moderno',
      description:
        'Apartamento en el centro de la ciudad con todas las comodidades.',
      price: '100 USD por noche',
    },
    {
      title: 'Villa de Lujo',
      href: 'https://example.com/villa-lujo',
      description: 'Villa exclusiva con piscina privada y vista al mar.',
      price: '300 USD por noche',
    },
  ]

  try {
    console.log('Insertando datos en la tabla Accommodations...')
    const insertedAccommodations = await Promise.all(
      accommodations.map(async (accommodation) => {
        console.log('Insertando:', accommodation)
        const result = await sql`
          INSERT INTO accommodations (title, href, description, price)
          VALUES (${accommodation.title}, ${accommodation.href}, ${
          accommodation.description ?? null
        }, ${accommodation.price})
          RETURNING *;
        `
        console.log('Resultado del INSERT:', result)
        return result
      })
    )

    console.log(
      'Datos insertados en la tabla Accommodations:',
      insertedAccommodations
    )
    return insertedAccommodations
  } catch (error) {
    console.error('Error en seedAccommodations:', error)
    throw error
  }
}

// Ejecutar todas las semillas
export async function GET() {
  try {
    console.log('Iniciando proceso de seed...')
    await createExtensions()
    await createUserTripDataTable()
    await createAccommodationsTable()
    await createAccommodationUsersTable() // Crear la tabla intermedia

    console.log('Llamando a seedUserTripData...')
    await seedUserTripData()

    console.log('Llamando a seedAccommodations...')
    await seedAccommodations()

    console.log('Datos sembrados en las tablas UserTripData y Accommodations')

    return Response.json({ message: 'Tablas sembradas exitosamente' })
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error)
    return Response.json(
      { error: 'Error al sembrar la base de datos' },
      { status: 500 }
    )
  }
}

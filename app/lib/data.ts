import postgres from 'postgres'
import { UserTripData, Accommodation } from './definitions'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

// Helper function to convert dates to UTC
// Helper function to convert dates to UTC
function toUTC(dateInput: string | Date): string {
  let localDate: Date

  if (typeof dateInput === 'string') {
    localDate = new Date(`${dateInput}T00:00:00-03:00`) // Interpret as GMT-3
  } else {
    localDate = dateInput
  }

  if (isNaN(localDate.getTime())) {
    throw new Error('Invalid date value')
  }

  return localDate.toISOString().split('T')[0] // Convert to UTC and format as YYYY-MM-DD
}

// Fetch all user stay times from the database
export async function fetchUsersTripData() {
  try {
    console.log('Fetching user stay times...')

    const data = await sql<UserTripData[]>`
      SELECT
        id,
        name,
        to_char(startDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "startDate",
        to_char(endDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "endDate",
        confirmed,
        car
      FROM userTripData
    `
    console.log('User stay times fetched successfully.')

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user stay times.')
  }
}

// Create a new user stay time in the database
export async function createUserTripData(
  userTripData: Omit<UserTripData, 'id'>
) {
  try {
    console.log('Creating user stay time...')
    const { name, startDate, endDate, confirmed, car } = userTripData

    // Ensure startDate and endDate are Date objects
    const start = new Date(startDate)
    const end = new Date(endDate)

    const data = await sql`
      INSERT INTO userTripData (name, startDate, endDate, confirmed, car)
      VALUES (${name}, ${toUTC(start)}, ${toUTC(end)}, ${confirmed}, ${car})
      RETURNING
        id,
        name,
        to_char(startDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "startDate",
        to_char(endDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "endDate",
        confirmed,
        car
    `

    console.log('User stay time created successfully.')
    console.log(data)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create user stay time.')
  }
}

// Update an existing user stay time in the database
export async function updateUserTripData(
  id: string,
  updates: Omit<UserTripData, 'id'>
) {
  try {
    console.log('Updating user stay time...')
    const { name, startDate, endDate, confirmed, car } = updates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const data = await sql`
      UPDATE userTripData
      SET
        name = ${name},
        startDate = ${toUTC(start)},
        endDate = ${toUTC(end)},
        confirmed = ${confirmed},
        car = ${car}
      WHERE id = ${id}
      RETURNING
        id,
        name,
        to_char(startDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "startDate",
        to_char(endDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "endDate",
        confirmed,
        car
    `

    console.log('User stay time updated successfully.')
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to update user stay time.')
  }
}

// Delete a user stay time from the database
export async function deleteUserTripData(id: string) {
  try {
    console.log('Deleting user stay time...')
    const data = await sql`
      DELETE FROM userTripData
      WHERE id = ${id}
      RETURNING
        id,
        name,
        to_char(startDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "startDate",
        to_char(endDate AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "endDate",
        confirmed,
        car
    `
    console.log('User stay time deleted successfully.')

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to delete user stay time.')
  }
}

// Fetch all accommodations from the database
export async function fetchAccommodations(): Promise<Accommodation[]> {
  try {
    console.log('Fetching accommodations...')
    const data = await sql<Accommodation[]>`
      SELECT
        id,
        title,
        href,
        description,
        price
      FROM accommodations
    `
    console.log('Accommodations fetched successfully.')

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch accommodations.')
  }
}
// Create a new accommodation in the database
export async function createAccommodation(
  accommodation: Accommodation
): Promise<Accommodation> {
  try {
    console.log('Creating accommodation...')
    const { title, href, description, price } = accommodation
    const data = await sql<Accommodation[]>`
      INSERT INTO accommodations (title, href, description, price)
      VALUES (${title}, ${href}, ${description ?? null}, ${price})
      RETURNING
        id,
        title,
        href,
        description,
        price
    `
    console.log('Accommodation created successfully.')

    return data[0] // Retorna el primer (y único) resultado del INSERT
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create accommodation.')
  }
}

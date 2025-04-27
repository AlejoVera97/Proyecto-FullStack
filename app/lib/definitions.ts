export interface UserTripData {
  id: string
  name: string
  startDate: Date
  endDate: Date
  confirmed: boolean
  car: boolean
}

export interface Accommodation {
  id: string
  title: string
  href: string
  description?: string
  price: string
}

interface Address {
  id: string
	addressLineOne?: string
	addressLineTwo?: string
	city?: string
	country?: string
	postalCode?: string
	state?: string
}

export interface Contact {
  id: string
	fullName?: string
  initials?: string
  role?: string
	displayName?: string
	email?: string
	phoneNumber?: string
	phoneCountryPrefix?: string
	teamIds?: string[]
	image?: string
	address: Address
	isEmployee?: boolean
	functionName?:string
}
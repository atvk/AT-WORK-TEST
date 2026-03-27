export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type UserStatus = 'active' | 'archived' | 'hidden';

export interface UserWithStatus extends User {
  status: UserStatus;
}

export interface UserFormValues {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
}
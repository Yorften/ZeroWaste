export interface User {
    id: string,
    email: string,
    password: string,
    name: string,
    last_name: string,
    address: string,
    phone_number: string,
    birth_date: Date,
    role: 'INDIVIDUAL' | 'COLLECTOR',
    points: number
}
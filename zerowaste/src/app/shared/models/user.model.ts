export interface User {
    email: string,
    password: string,
    name: string,
    last_name: string,
    address: string,
    phone_number: string,
    birth_date: Date,
    role: 'INDIVIDUAL' | 'COLLECTOR'
}
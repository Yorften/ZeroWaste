import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataSeederService {
  private seedFlagKey = 'appSeeded';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  seedData(): void {
    
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const seeded = localStorage.getItem(this.seedFlagKey);
    if (!seeded) {
      const users: User[] = [
        {
          email: 'indiv@youcode.ma',
          password: 'password',
          name: 'John',
          last_name: 'Doe',
          address: '123 Main St, Cityville',
          phone_number: '1234567890',
          birth_date: new Date('1990-01-01'),
          role: 'INDIVIDUAL'
        },
        {
          email: 'coll@youcode.ma',
          password: 'password',
          name: 'Jane',
          last_name: 'Smith',
          address: '456 Market St, Townsville',
          phone_number: '0987654321',
          birth_date: new Date('1985-05-15'),
          role: 'COLLECTOR'
        },
        {
          email: 'indiv1@youcode.ma',
          password: 'password',
          name: 'Alice',
          last_name: 'Johnson',
          address: '789 Elm St, Villagetown',
          phone_number: '1112223333',
          birth_date: new Date('1992-07-10'),
          role: 'INDIVIDUAL'
        },
        {
          email: 'coll1@youcode.ma',
          password: 'password',
          name: 'Robert',
          last_name: 'Brown',
          address: '147 Pine St, Metrocity',
          phone_number: '4445556666',
          birth_date: new Date('1983-03-25'),
          role: 'COLLECTOR'
        },
        {
          email: 'indiv2@youcode.ma',
          password: 'password',
          name: 'Sophia',
          last_name: 'Davis',
          address: '963 Oak Ave, Lakeside',
          phone_number: '7778889999',
          birth_date: new Date('1995-09-30'),
          role: 'INDIVIDUAL'
        },
        {
          email: 'coll2@youcode.ma',
          password: 'password',
          name: 'Michael',
          last_name: 'Wilson',
          address: '852 Cedar St, Downtown',
          phone_number: '5554443333',
          birth_date: new Date('1987-11-12'),
          role: 'COLLECTOR'
        },
        {
          email: 'indiv3@youcode.ma',
          password: 'password',
          name: 'Emily',
          last_name: 'White',
          address: '741 Maple St, Riverside',
          phone_number: '6667778888',
          birth_date: new Date('1998-04-22'),
          role: 'INDIVIDUAL'
        },
        {
          email: 'coll3@youcode.ma',
          password: 'password',
          name: 'David',
          last_name: 'Martinez',
          address: '369 Birch St, Uptown',
          phone_number: '2223334444',
          birth_date: new Date('1989-06-18'),
          role: 'COLLECTOR'
        },
        {
          email: 'indiv4@youcode.ma',
          password: 'password',
          name: 'Oliver',
          last_name: 'Anderson',
          address: '258 Chestnut St, Suburbia',
          phone_number: '9990001111',
          birth_date: new Date('1993-12-05'),
          role: 'INDIVIDUAL'
        },
        {
          email: 'coll4@youcode.ma',
          password: 'password',
          name: 'Lucas',
          last_name: 'Taylor',
          address: '123 Walnut St, Capital City',
          phone_number: '3332221111',
          birth_date: new Date('1984-08-27'),
          role: 'COLLECTOR'
        }
      ];
      console.log("Seeding users...");

      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem(this.seedFlagKey, 'true');

      console.log("Seeding users done!");

    } else {
      console.log("Data already seeded. Skipping seeding...");
    }
  }

}

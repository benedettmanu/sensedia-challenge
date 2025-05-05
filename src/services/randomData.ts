import { User } from "@/models/User";

const cities = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", 
  "Fortaleza", "Recife", "Porto Alegre", "Curitiba", "Manaus",
  "Goiânia", "Belém", "Florianópolis", "Vitória"
];

const weekdayOptions = [
  "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Todos", "Fim de semana"
];

export function getRandomCity(): string {
  return cities[Math.floor(Math.random() * cities.length)];
}

export function getRandomWeekdays(): string {
  return weekdayOptions[Math.floor(Math.random() * weekdayOptions.length)];
}

export function enrichUserData(users: User[]): User[] {
  return users.map(user => ({
    ...user,
    city: getRandomCity(),
    weekdays: getRandomWeekdays(),
  }));
}
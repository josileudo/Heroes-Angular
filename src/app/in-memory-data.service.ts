import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const heroes = [
      { id:11, name: 'Loki' },
      { id:12, name: 'Thor' },
      { id:13, name: 'Iron-Man' },
      { id:14, name: 'Batman' },
      { id:15, name: 'Wolwerine' },
      { id:16, name: 'Super-man' },
      { id:17, name: 'Spider-man' },
      { id:18, name: 'Tommy' },
      { id:19, name: 'ScoobyDoo' },
      { id:20, name: 'Fera' },
    ]
    return {heroes}
  }
  genId(heroes: Hero[]): number{
    return heroes.length > 0 ?
    Math.max(...heroes.map(hero => hero.id)) + 1 : 11
  }
}

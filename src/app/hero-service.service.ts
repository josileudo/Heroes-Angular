import { Injectable, OnInit } from '@angular/core'
import {Observable, of} from "rxjs"

import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { MessageService } from './message.service'


@Injectable({
  providedIn: 'root'
})

export class HeroService{

  constructor(
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of (HEROES)
    this.messageService.add("HeroService: Buscando Heróis ")
    return heroes
  }

  getHero(id: number): Observable<Hero>{
    const hero = HEROES.find(h => h.id === id)!
    this.messageService.add(`HeroService: Herís encontrado id= ${id}`)
    return of (hero)
  }
}

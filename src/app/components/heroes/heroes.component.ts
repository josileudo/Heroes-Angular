import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';

import { HeroService } from 'src/app/hero-service.service';

@Component ({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  selectedHero?:Hero

  heroes: Hero[]=[]

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  constructor(
    private heroService: HeroService
  ){}

  getHeroes(): void {
    this.heroService.getHeroes().
      subscribe(heroes => this.heroes = heroes)
  }

  ngOnInit (){
    this.getHeroes()
    console.log(this.getHeroes())
  }
}

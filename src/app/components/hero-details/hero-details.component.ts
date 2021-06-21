import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Hero } from 'src/app/hero';

import { HeroService } from "src/app/hero-service.service";


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})

export class HeroDetailsComponent  {

  constructor (
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  @Input() hero?:Hero

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }
}


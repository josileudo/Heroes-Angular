import { Injectable, OnInit } from '@angular/core'
import { Observable, of } from "rxjs"
import { HttpClient, HttpClientXsrfModule, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'

import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { MessageService } from './message.service'


@Injectable({
  providedIn: 'root'
})

export class HeroService{

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private heroesUrl = "api/heroes"

  private handleError<T>(operation = 'operation', result?: T){
    return (error : any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(_ => this.log('herói encontrado')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe (
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(
      this.heroesUrl, hero, this.httpOptions)
      .pipe(tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>
      (this.heroesUrl, hero, this.httpOptions)
      .pipe (
        tap((newHero: Hero) =>
          this.log(`adicionar hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Hero>('addHero'))

      )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_=> this.log(`Apagando herói id = ${id}`)),
      catchError(this.handleError <Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim){
      return of ([])
    }
    return this.http.get<Hero[]>(
      `${this.heroesUrl}/?name=${term}`).pipe(
        tap(x => x.length
          ? this.log (`Herói encontrado ${term}`)
          : this.log (`Heróis não encontrado ${term}`)),
          catchError(this.handleError<Hero[]>
            ('searchHeroes', []))
    )

  }
}


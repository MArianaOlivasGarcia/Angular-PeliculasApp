import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NowPlayingResponse, Movie } from '../interfaces/NowPlayingResponse';
import { MovieDetailsResponse } from '../interfaces/movieDetails.interface';
import { CreditsResponse, Cast } from '../interfaces/creditsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private page = 1;
  public cargando = false;


  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '33df75fbfb8a42f0c4b82954d0c28435',
      language: 'es-ES',
      page: this.page.toString()
    };
  }


  getNowPlaying(): Observable<Movie[]> {

    if ( this.cargando ) { return of([]); }

    this.cargando = true;

    return this.http.get<NowPlayingResponse>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( resp => resp.results ),
      tap( () => {
        this.page += 1;
        this.cargando = false;
      })
    )
  }


  resetCarteleraPage(): void {
    this.page = 1;
  }


  searchMovie( query: string ): Observable<Movie[]> {


    const params = {
      ...this.params, 
      page: 1,
      query
    }

    return this.http.get<NowPlayingResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    )

  }


  getDetailsById( id: string ) {
    return this.http.get<MovieDetailsResponse>(`${ this.baseUrl }/movie/${ id }`,{
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }


  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ id }/credits`,{
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of(null) )
    )
  }

}

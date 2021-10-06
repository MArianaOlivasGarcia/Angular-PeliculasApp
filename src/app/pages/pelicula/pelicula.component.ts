import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieDetailsResponse } from '../../interfaces/movieDetails.interface';
import { Cast } from '../../interfaces/creditsResponse.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetailsResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private location: Location,
               private router: Router,
               private movieService: MovieService ) { }

  ngOnInit(): void {
    const { id } =this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieService.getDetailsById( id ),
      this.movieService.getCast( id )
    ]).subscribe( ([movie, cast]) => {
      
        if ( !movie ) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movie;
        this.cast = cast
    });

  }

  regresar(): void {
    this.location.back();
  }

}

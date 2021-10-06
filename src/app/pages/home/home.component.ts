import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/NowPlayingResponse';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    /* Posicion max de la pantalla */
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );
    
    if ( position > max ) {

      // Llamar al servicio 
      if ( this.movieService.cargando ) { return; }

      
      this.movieService.getNowPlaying() 
        .subscribe( movies => {
          this.movies.push(...movies);
        })
    }

  }

  constructor( private movieService: MovieService ){

    

  }

  ngOnInit(): void {
    this.movieService.getNowPlaying()
      .subscribe( movies => {
        this.movies = movies;
        this.moviesSlideshow = movies;
      });
  }


  ngOnDestroy() {
    this.movieService.resetCarteleraPage();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/NowPlayingResponse';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public movies: Movie[] = [];
  public query: string = '';

  constructor( private activatedRoute: ActivatedRoute,
               private movieService: MovieService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({texto}) => {
        this.query = texto;
        this.movieService.searchMovie(texto)
            .subscribe( movies => {
              this.movies = movies;
            })
      })
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit, AfterViewInit {

  @ViewChild('mapaa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map; 

  zoomLevel: number = 10;

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa= new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.08528470499417, 4.604392772969091],
      zoom: this.zoomLevel
    });
    
    this.mapa.on('zoom',(ev) =>{
     this.zoomLevel = this.mapa.getZoom();
    });
    this.mapa.on('zoomend',(ev) =>{
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
     });
    
  }

  onChangeInput(event: string){

    this.mapa.zoomTo(Number(event));
    

  }



  ngOnInit(): void {
    // this.mapa = new mapboxgl.Map({
    //   container: 'mapa',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-74.08528470499417, 4.604392772969091],
    //   zoom: 17.4
    // });
  }

  zoomIn(){
    this.mapa.zoomIn();

  }
  zoomOut(){
    this.mapa.zoomOut();
  }

}

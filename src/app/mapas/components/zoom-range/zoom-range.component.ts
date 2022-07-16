import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css'],
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapaa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;

  center: [number, number] = [-74.08528470499417, 4.604392772969091];

  constructor() {}
  ngOnDestroy(): void {
    this.mapa.off('zoom', () =>{});
    this.mapa.off('zoomend', () =>{});
    this.mapa.off('move', () =>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });
    this.mapa.on('move', (ev) => {
      this.center = [this.mapa.getCenter().lat, this.mapa.getCenter().lng];
    });
  }

  onChangeInput(event: string) {
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

  zoomIn() {
    this.mapa.zoomIn();
  }
  zoomOut() {
    this.mapa.zoomOut();
  }
}

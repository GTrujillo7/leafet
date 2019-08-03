import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker,circle,zoomAnimation, layerGroup, mapboxUrl, mapboxAttribution, layers} from 'leaflet';
import { control} from 'leaflet';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  map: Map;
  // declaracion de variables ciudades
  lit: any;
  denver: any;
  aurora: any;
  golden: any;

  // arreglo de las ciudades

  sitios: any;

  // botones

  grayscale: any;
  streets: any;
  baseMaps: any;
  overlayMaps: any;
  controlin: any;

  // marcador en tiempo real

  Marcahora: any;


  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([28.644800, 77.216721], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
     {
      attribution: 'Tracker.com © ionic 4 LeafLet',
      layers: [this.grayscale, this.sitios],
    }).addTo(this.map);

    // locate monitorea con watch, pone marcador, pone circulo con esas especificicaines
    this.map.locate({setView: true, watch: true, maxZoom: 20});

    //if (this.map.locate.watch = true){
      console.log("si ando jalando we");
    //}


    marker([28.6, 77]).bindPopup('Ay Vamos Avanzando!!').addTo(this.map);
    circle(([28.6, 77]), {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50.0}).addTo(this.map);

    // Marcadores Gringos!!
    this.lit = marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(this.map);
    this.denver = marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(this.map);
    this.aurora = marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(this.map);
    this.golden = marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(this.map);

    // arreglo con las ciudades para englobar en el boton!!
    this.sitios = layerGroup([this.lit, this.denver, this.aurora, this.golden]);

    this.grayscale = tileLayer(mapboxUrl, {id: 'mapId', attribution: mapboxAttribution}),
    this.streets   = tileLayer(mapboxUrl, {id: 'mapId', attribution: mapboxAttribution});

    // aqui es donde etan los nombres de la cosilla gris!!
    this.baseMaps = {
    EscalaGris: this.grayscale,
    Calles: this.streets
  };
    // aqui tambien es lo de la cosilla gris, el que dice sitios!!
    this.overlayMaps = {
    Sitios: this.sitios
  };
    // this control es la variable que tomara el valor de la caracterisca cotrl del api con la propiedad layers
    this.controlin = control.layers(this.baseMaps, this.overlayMaps).addTo(this.map);

    this.baseMaps = {
      '<span style=\'color: gray\'>Grayscale</span>': this.grayscale,
      Streets: this.sitios
  };

  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
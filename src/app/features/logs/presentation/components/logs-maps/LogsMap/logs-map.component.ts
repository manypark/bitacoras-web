import { OnInit, signal, ViewChild } from '@angular/core';
import { Component, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';

import { LogsService } from '@app/logs/presentation/services';

@Component({
  selector    : 'logs-map',
  styleUrl    : './logs-map.component.css',
  templateUrl : './logs-map.component.html',
  imports     : [CommonModule, GoogleMapsModule, NgOptimizedImage],
})
export class LogsMapComponent implements OnInit {
  readonly logsService = inject(LogsService);

  selectedMarker: any = null;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  zoom = 13;
  center = signal< {lng:number, lat:number} | null  >(null);
  markers = computed(() => {
    const data = this.logsService.logsQuery.data()?.data ?? [];
    return data.map((log) => ({
      idLog       : log.idLogs,
      position    : { lat: log.latitud, lng: log.longitud },
      title       : `${log.idConcept.description}`,
      description : log.description,
      user        : `${log.idUser.firstName} ${log.idUser.lastName}`,
      image       : log.image_url,
    }));
  });

  ngOnInit(): void {
    this.getPosition().then(pos => {
        this.center.set({ lat: pos.lat, lng: pos.lng });
    });
  }

  onMarkerClick( marker : any, mapAdvancedMarker : MapAdvancedMarker ) {
    this.selectedMarker = marker;
    this.infoWindow.open(mapAdvancedMarker);
  }

  getPosition(): Promise<{lng:number, lat:number}> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => { resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude }); },
        err => { reject(err); });
    });
   }
}
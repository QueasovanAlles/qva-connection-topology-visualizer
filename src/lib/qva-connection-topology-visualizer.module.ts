import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioJackHoleComponent } from './audio-jack-hole/audio-jack-hole.component';
import { AudioJackRackComponent } from './audio-jack-rack/audio-jack-rack.component';
import { ConnectionCableComponent } from './connection-cable/connection-cable.component';
import { CableCursorComponent } from './cable-cursor.component';
import { ConnectionService } from './connection.service';
import { PositionUpdateService } from './position-update.service';
import { QvaCtvLoggerService } from './qva-ctv-logger.service';
import { QvaConnectionTopologyVisualizerComponent } from './qva-connection-topology-visualizer.component';
import { QvaConnectionTopologyVisualizerService } from './qva-connection-topology-visualizer.service';

@NgModule({
  declarations: [
    AudioJackHoleComponent,
    AudioJackRackComponent,
    ConnectionCableComponent,
    CableCursorComponent,
    QvaConnectionTopologyVisualizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AudioJackHoleComponent,
    AudioJackRackComponent,
    ConnectionCableComponent,
    CableCursorComponent,
    QvaConnectionTopologyVisualizerComponent
  ],
  providers: [
    ConnectionService,
    PositionUpdateService,
    QvaCtvLoggerService,
    QvaConnectionTopologyVisualizerService
  ]
})
export class QvaConnectionTopologyVisualizerModule { }
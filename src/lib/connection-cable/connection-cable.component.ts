import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-connection-cable',
  templateUrl: './connection-cable.component.html',
  styleUrls: ['./connection-cable.component.scss'],
  animations: [
    trigger('drawPath', [
      transition(':enter', [
        style({ strokeDashoffset: '100%' }),
        animate('1000ms ease-out', style({ strokeDashoffset: '0%' }))
      ])
    ]),
    trigger('plugAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ConnectionCableComponent {
  @Input() startPoint: { x: number; y: number } = { x: 0, y: 0 };
  @Input() endPoint: { x: number; y: number } = { x: 0, y: 0 };
  @Input() cableColor: string = '#4B0082';
  @Input() tension: number = 0.5; // Controls cable sag (0-1)

  get pathData(): string {
    const dx = this.endPoint.x - this.startPoint.x;
    const dy = this.endPoint.y - this.startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control points for the curve
    const midX = (this.startPoint.x + this.endPoint.x) / 2;
    const midY = (this.startPoint.y + this.endPoint.y) / 2;
    
    // Calculate sag based on tension
    const sag = distance * (1 - this.tension) * 0.5;
    
    // Create a natural-looking curve with controlled sag
    const cp1x = midX - dx * 0.25;
    const cp1y = midY + sag;
    const cp2x = midX + dx * 0.25;
    const cp2y = midY + sag;

    return `M ${this.startPoint.x},${this.startPoint.y} 
            C ${cp1x},${cp1y} 
              ${cp2x},${cp2y} 
              ${this.endPoint.x},${this.endPoint.y}`;
  }
}
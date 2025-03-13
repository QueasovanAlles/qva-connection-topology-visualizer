import { Component, Input, HostListener, ElementRef, OnInit } from '@angular/core';
import { InOut } from './../connection.service';

export interface JackConnection {
    peerId: string;
    state: string;
}

@Component({
    selector: 'app-audio-jack-rack',
    templateUrl: './audio-jack-rack.component.html',
    styleUrls: ['./audio-jack-rack.component.scss'],
})
export class AudioJackRackComponent {
   
  @Input() inputs: number = 0;
  @Input() outputs: number = 0;
  @Input() title: string = '';
  @Input() showTitle: boolean = true;
  @Input() draggable: boolean = true;
  @Input() width: number = 10;
  @Input() height: number = 15;
  @Input() id: string | number = '';

  private isDragging = false;
  private currentX = 0;
  private currentY = 0;
  private initialX = 0;
  private initialY = 0;
  
  // Make InOut accessible to the template
  InOut = InOut;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Add a unique identifier if not provided
    if (!this.id) {
      this.id = 'rack-' + Math.floor(Math.random() * 10000);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.draggable) return;
    
    this.isDragging = true;
    this.initialX = event.clientX - this.currentX;
    this.initialY = event.clientY - this.currentY;
    event.preventDefault();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.draggable) {
      this.currentX = event.clientX - this.initialX;
      this.currentY = event.clientY - this.initialY;
      this.el.nativeElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }
  }

  // Method to generate array based on outputs count
  getOutputsArray(): number[] {
    return Array(this.outputs).fill(0).map((_, index) => index);
  }

  // Method to generate array based on inputs count
  getInputsArray(): number[] {
    return Array(this.inputs).fill(0).map((_, index) => index);
  }
}
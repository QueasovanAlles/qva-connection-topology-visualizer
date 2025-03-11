import { Component, Input, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { ConnectionService, InOut } from './connection.service';

@Component({
  selector: 'app-cable-cursor',
  template: `
    <div class="cable-cursor" [style.left.px]="x" [style.top.px]="y">
      <app-audio-jack-hole [id]="cursorJackId" [inout]="connection.inout">
      </app-audio-jack-hole>
	  <div class="overlay-button" (click)="onClick($event)"></div>
    </div>
  `,
  styles: [`
    .cable-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }
    .overlay-button {
		position: absolute;
		left:0px; width:100%;height:100%;top:0px;
	}
  `]
})
export class CableCursorComponent implements AfterViewInit {

	@Input() connection: any;
	 
	x = 0;
	y = 0;
	cursorJackId = 'cursor-jack-' + Date.now();

	constructor(private connectionService: ConnectionService, private elementRef: ElementRef) {
		window.addEventListener('mousemove', (e) => {
		    this.x = e.clientX;
		    this.y = e.clientY;
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			if (this.connection.inout === InOut.INPUT) {
			  this.connectionService.setConnection(
                this.connection.from.length === 0 ? this.connection.to : this.connection.from,
				this.cursorJackId,						
				this.connection.inout
			  );
			} else {
			  this.connectionService.setConnection(
				this.connection.from.length === 0 ? this.connection.to : this.connection.from,
				this.cursorJackId,
				this.connection.inout
			  );
			}
			
		}, 10);
	}

	getOppositeInout(inout:InOut): InOut {
		return inout === InOut.INPUT ? InOut.OUTPUT : InOut.INPUT;
	}

    onClick(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
	    this.connectionService.handleCursorClick({
			x: event.clientX,
			y: event.clientY,
			connection:  this.connection 
		});
	}

}
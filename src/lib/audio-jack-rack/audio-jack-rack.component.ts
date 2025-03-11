import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface JackConnection {
    peerId: string;
    state: string;
}

@Component({
    selector: 'app-audio-jack-rack',
    templateUrl: './audio-jack-rack.component.html',
    styleUrls: ['./audio-jack-rack.component.scss'],
    animations: [
        trigger('plugState', [
			state('void', style({ 
				opacity: 0.6, 
				transform: 'scale(1)' 
			})),
			state('*', style({ 
				opacity: 1, 
				transform: 'scale(1)' 
			})),
			transition('void => *', animate('1000ms ease-out'))
        ])
    ]
})
export class AudioJackRackComponent {
    @Input() connections: JackConnection[] = [];
    @Input() clientId: string = '';
	
    getRackJackId(peerId: string): string {
        return `rack_${this.clientId}_${peerId}`;
    }

    constructor(private cdr: ChangeDetectorRef) {}

	ngAfterViewInit() {
		
	}

	onJackHoleLoaded(element: HTMLElement) {
		
	}

}

// src/qva-connection-topology-visualizer/src/audio-jack-hole/audio-jack-hole.component.ts
import { Component, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ConnectionService, InOut} from '../connection.service';
import { PositionUpdateService } from '../position-update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-jack-hole',
  templateUrl: './audio-jack-hole.component.html',
  styleUrls: ['./audio-jack-hole.component.scss'],
})
export class AudioJackHoleComponent implements AfterViewInit, OnDestroy {

    @Input() id!: string;
    @Input() inout!: InOut;

    public position: { x: number; y: number; width: number; height: number } = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
    };
    public isVisible: boolean = false;

    private intervalId: any;
    private observer: IntersectionObserver | null = null;
    private pollingSubscription: Subscription |  null = null;

	constructor(
		private elementRef: ElementRef,
		private connectionService: ConnectionService,
		private positionUpdateService: PositionUpdateService
	) {
		
	}

	generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substring(2);
	}

	ngAfterViewInit(): void {
	  // Subscribe to polling state changes
	  this.pollingSubscription = this.positionUpdateService.isPollingEnabled$.subscribe((enabled) => {
		if (enabled) {
		  // Start polling if enabled
		  if (!this.intervalId) {
			this.intervalId = setInterval(() => this.updatePosition(), 100);
		  }
		} else {
		  // Stop polling if disabled
		  if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		  }
		}
	  });
	  setTimeout(()=> {
		if (!this.id) 
			throw new Error('AudioJackHoleComponent requires a unique ID');
				// Calculate initial position and register only if not already registered
			    this.updatePositionAndRegister();

			    // Set up IntersectionObserver to detect visibility
			    this.setupIntersectionObserver();
		}, 500);
	}

	ngOnDestroy(): void {
		if (this.intervalId) {
		  clearInterval(this.intervalId);
		}
		if (this.observer) {
		  this.observer.disconnect();
		}
		if (this.pollingSubscription) {
		  this.pollingSubscription.unsubscribe();
		}
    }

	private updatePositionAndRegister(): void {
	  const rect = this.elementRef.nativeElement.getBoundingClientRect();
	  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	  const newPosition = {
		x: rect.left + scrollLeft+2,
		y: rect.top + scrollTop+2,
		width: rect.width,
		height: rect.height,
	  };

	  this.position = newPosition;
	  
	  // Only register if this is the first time seeing this jack hole
	  if (!this.connectionService.isJackHoleRegistered(this.id)) {
		this.connectionService.registerOrUpdateJackHole(this.id, this.position, this.inout);
	  }
	}

	private updatePosition(): void {
	  const rect = this.elementRef.nativeElement.getBoundingClientRect();
	  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	  const newPosition = {
		x: rect.left + scrollLeft+2,
		y: rect.top + scrollTop+2,
		width: rect.width,
		height: rect.height,
	  };

	  // Only update if position has changed significantly
	  if (
		Math.abs(newPosition.x - this.position.x) > 1 ||
		Math.abs(newPosition.y - this.position.y) > 1 ||
		Math.abs(newPosition.width - this.position.width) > 1 ||
		Math.abs(newPosition.height - this.position.height) > 1
	  ) {
		this.position = newPosition;
		this.connectionService.registerOrUpdateJackHole(this.id, this.position, this.inout);
	  }
	}

	private setupIntersectionObserver(): void {
		this.observer = new IntersectionObserver(
		  (entries) => {
			entries.forEach((entry) => {
			  this.isVisible = entry.isIntersecting;
			});
		  },
		  { root: null, rootMargin: '0px', threshold: 0.1 }
		);
		this.observer.observe(this.elementRef.nativeElement);
	}

	cableChange() {
		this.connectionService.cableChange(
			this.id, 
			this.inout, 
			this.elementRef.nativeElement.getBoundingClientRect().left, 
			this.elementRef.nativeElement.getBoundingClientRect().top);
	}

}
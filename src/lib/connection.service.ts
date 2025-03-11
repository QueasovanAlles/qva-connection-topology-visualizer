import { Injectable, EventEmitter } from '@angular/core';

interface JackHolePosition {
    id: string; // Unique identifier for each AudioJackHole
    position: { x: number; y: number; width: number; height: number };
    inout : InOut;
}

export enum InOut {
  INPUT = 'input',
  OUTPUT = 'output'
}

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

    private jackHoles: JackHolePosition[] = []; // Registry of jack holes
    private connections: { from: string; to: string; inout : string }[] = []; // List of connections
	private cables : any[] = [];

    private cabling: boolean = false;
    public cablingChange = new EventEmitter<any | null>();
    public cablesChanged = new EventEmitter<any[]>();

	demoRandomConnect() {
		// Get available jacks (not yet connected)
		const getAvailableJacks = (jacks: JackHolePosition[]) => 
			jacks.filter(jack => 
				!this.connections.some(conn => 
					conn.from === jack.id || conn.to === jack.id
				)
			);

		let availableOutputs = getAvailableJacks(
			this.jackHoles.filter(jack => jack.inout === InOut.OUTPUT)
		);
		let availableInputs = getAvailableJacks(
			this.jackHoles.filter(jack => jack.inout === InOut.INPUT)
		);

		// Calculate possible connections based on available jacks
		const maxConnections = Math.min(
			3 + Math.floor(Math.random() * 3),
			Math.min(availableOutputs.length, availableInputs.length)
		);

		for (let i = 0; i < maxConnections; i++) {
			const randomOutputIndex = Math.floor(Math.random() * availableOutputs.length);
			const randomInputIndex = Math.floor(Math.random() * availableInputs.length);

			const randomOutput = availableOutputs[randomOutputIndex];
			const randomInput = availableInputs[randomInputIndex];

			if (randomOutput && randomInput) {
				this.addConnection(randomOutput.id, InOut.OUTPUT);
				this.setConnection(randomOutput.id, randomInput.id, InOut.INPUT);

				// Remove used jacks from available pools
				availableOutputs = availableOutputs.filter(jack => jack.id !== randomOutput.id);
				availableInputs = availableInputs.filter(jack => jack.id !== randomInput.id);
			}
		}
	}

	removeJackHole(id: string): void {
	  this.jackHoles = this.jackHoles.filter(jh => jh.id !== id);
	  this.removeConnection(id);
	  this.drawCables();
	}

    // Register or update a jack hole's position
    registerOrUpdateJackHole(id: string, position: { x: number; y: number; width: number; height: number }, inout : InOut): void {
		const existing = this.jackHoles.find((jh) => jh.id === id);
		if (existing) {
		  existing.position = position;
		} else {
		  this.jackHoles.push({ id, position, inout});
		}
		console.log('Registered/Updated jack holes:', this.jackHoles);
		this.drawCables(); // Redraw cables whenever a position updates
	}

	addConnection(anId: string, inout: InOut): any {
	  const connection = {
		from: inout === InOut.INPUT ? anId : '',
		to: inout === InOut.OUTPUT ? anId : '',
		inout: this.getOppositeInout(inout)  // meaning is : what we search
	  };
	  this.connections.push(connection);
	  this.drawCables();
      return connection;
	}

	setConnection(connectedId: string, connectWithId: string, inout: InOut): boolean {
	  const connection = this.connections.find(
		conn => conn.from === connectedId || conn.to === connectedId
	  );
	  
	  if (connection && connection.inout === inout) {
		if (connection.inout === InOut.INPUT) {
		  connection.from = connectWithId;
		} else {
		  connection.to = connectWithId;
		}
		this.drawCables();
		return true;
	  }
	  return false;
	}


    removeConnection(anId: string): void {
	  this.connections = this.connections.filter(
		conn => conn.from !== anId && conn.to !== anId
	  );
	  this.drawCables();
	}
   
	cleanupUnConnected(): void {
	  this.connections = this.connections.filter(
		conn => conn.from !== '' && conn.to !== ''
	  );
	  this.drawCables();
	}

    cableChange(holeId: string, inout : InOut, left :number, top:number) {
		const existingConnection = this.connections.find(
		  conn => conn.from === holeId || conn.to === holeId
		);
        let cablingConnection : any;
		if (!existingConnection) {
		  // Start new connection
		  const newConnection = this.addConnection(holeId, inout);
		  this.cabling = true;
		  cablingConnection = newConnection;
		} else {
		  // Modify existing connection
		  if (existingConnection.from === holeId) {
			existingConnection.to = '';
		  } else {
			existingConnection.from = '';
		  }
		  this.cabling = true;
		  cablingConnection = existingConnection;
		}
		if (cablingConnection) {
			this.drawCables();
			cablingConnection.x = left;cablingConnection.y=top;
			this.cablingChange.emit(cablingConnection);
			this.drawCables();
		}
	}

     handleCursorClick(data: { x: number, y: number, connection: any }) {
		if (data.connection.inout===InOut.OUTPUT) 
			this.removeJackHole(data.connection.to);
		else this.removeJackHole(data.connection.from);
		const nearestJack = this.findNearestCompatibleJack(
		  data.x, 
		  data.y, 
		  data.connection.inout
		);

		if (data.connection.from.substr(0,6) === 'cursor') {
			this.removeConnection(data.connection.to);
			if (nearestJack && this.isWithinRange(nearestJack, data.x, data.y)) {
			  this.addConnection(data.connection.to,data.connection.inout);
			  this.setConnection(
				data.connection.to,
				nearestJack.id,
				this.getOppositeInout(data.connection.inout)
			  );
			} 
		} else {
			this.removeConnection(data.connection.from);
			if (nearestJack && this.isWithinRange(nearestJack, data.x, data.y)) {
			  this.addConnection(data.connection.from,data.connection.inout);
			  this.setConnection(
				data.connection.from,
				nearestJack.id,
				this.getOppositeInout(data.connection.inout)
			  );
			} 
		}



        this.cleanupUnConnected();		

		this.cabling = false;
		this.cablingChange.emit(null);
		this.drawCables();
	}

	private findNearestCompatibleJack(x: number, y: number, inout: InOut): JackHolePosition | null {
		return this.jackHoles
		  .filter(jack => jack.inout === inout)
		  .reduce<{ jack: JackHolePosition, distance: number } | null>(
			(nearest, jack) => {
			  const distance = this.getDistance(x, y, jack.position);
			  return (!nearest || distance < nearest.distance)
				? { jack, distance }
				: nearest;
			}, 
			null
		  )?.jack || null;
	}

	private getDistance(x: number, y: number, position: any): number {
		const dx = x - position.x;
		const dy = y - position.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	private isWithinRange(jack: JackHolePosition, x: number, y: number): boolean {
		return this.getDistance(x, y, jack.position) < 50;
	}

	private getOppositeInout(inout: InOut): InOut {
		return inout === InOut.INPUT ? InOut.OUTPUT : InOut.INPUT;
	}

	private getRandomDarkColor(): string {
	    const hue = Math.floor(Math.random() * 360);
	    const saturation = 60 + Math.random() * 20; // 60-80%
	    const lightness = 20 + Math.random() * 15;  // 20-35%
	    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	private drawCables(): void {
		let newCables:any = [];
		this.connections.forEach((connection : any) => {
			const fromJack = this.jackHoles.find((jh) => jh.id === connection.from);
			const toJack = this.jackHoles.find((jh) => jh.id === connection.to);
			
			if (fromJack && toJack) {
			    newCables.push({
					startPoint: fromJack.position,
					endPoint: toJack.position,
					color: this.getRandomDarkColor()
				});
			}
		});
		this.cables = newCables;
		// Emit the updated cables array
		this.cablesChanged.emit(this.cables);
	}

}
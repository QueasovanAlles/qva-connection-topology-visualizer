# qva-connection-topology-visualizer
Dynamic visualization module for audio routing and connection management. Create interactive patching interfaces with draggable devices, connection points, and animated cables.

![Image description](/docs/qva-connection-topology-visualizer.png)

## Features
-Drag-and-drop vritual audio cables into virtual devices
-Visualisation with animated cable connections
-Input/Output jack management
-Available for implementing according to own needs


## Installation

### Install via npm

npm install qva-connection-topology-visualizer

```ts
// In your module
import { QvaConnectionTopologyVisualizerModule } from 'qva-connection-topology-visualizer';

@NgModule({
  imports: [
    QvaConnectionTopologyVisualizerModule
  ]
})
export class AppModule { }

// In your component template
<qva-audio-jack-rack [config]="rackConfig">
  <qva-audio-jack-hole type="input" label="Audio In"></qva-audio-jack-hole>
  <qva-audio-jack-hole type="output" label="Audio Out"></qva-audio-jack-hole>
</qva-audio-jack-rack>
```


### Running the demo

[QvA Connection Topology Visualizer Demo](https://github.com/QueasovanAlles/qva-connection-topology-visualizer-demo) -- todo


## Usage
Import the module and start creating your audio routing interface with minimal setup. Full documentation and examples available in the demo repository.

### Used in other QvA projects
[QvA Connection Topology Visualizer Demo](https://github.com/QueasovanAlles/qva-connection-topology-visualizer-demo)  -- TODO
QvAHub Monitor - not yet released

### Using other QvA projects
No. This is an endpoint.

[Watch Demo on YouTube](https://www.youtube.com/watch?v=your-video-id)  -- TODO


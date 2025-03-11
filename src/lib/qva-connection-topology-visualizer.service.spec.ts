import { TestBed } from '@angular/core/testing';

import { QvaConnectionTopologyVisualizerService } from './qva-connection-topology-visualizer.service';

describe('QvaConnectionTopologyVisualizerService', () => {
  let service: QvaConnectionTopologyVisualizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QvaConnectionTopologyVisualizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

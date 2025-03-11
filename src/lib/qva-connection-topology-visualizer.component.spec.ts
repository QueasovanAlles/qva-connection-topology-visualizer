import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QvaConnectionTopologyVisualizerComponent } from './qva-connection-topology-visualizer.component';

describe('QvaConnectionTopologyVisualizerComponent', () => {
  let component: QvaConnectionTopologyVisualizerComponent;
  let fixture: ComponentFixture<QvaConnectionTopologyVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QvaConnectionTopologyVisualizerComponent]
    });
    fixture = TestBed.createComponent(QvaConnectionTopologyVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

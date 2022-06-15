import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAnalysisComponent } from './fb-analysis.component';

describe('FbAnalysisComponent', () => {
  let component: FbAnalysisComponent;
  let fixture: ComponentFixture<FbAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

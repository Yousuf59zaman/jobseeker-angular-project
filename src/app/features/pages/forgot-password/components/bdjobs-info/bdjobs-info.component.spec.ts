import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdjobsInfoComponent } from './bdjobs-info.component';

describe('BdjobsInfoComponent', () => {
  let component: BdjobsInfoComponent;
  let fixture: ComponentFixture<BdjobsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BdjobsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdjobsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

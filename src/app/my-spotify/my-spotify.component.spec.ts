import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpotifyComponent } from './my-spotify.component';

describe('MySpotifyComponent', () => {
  let component: MySpotifyComponent;
  let fixture: ComponentFixture<MySpotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

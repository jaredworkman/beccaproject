import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectoryComponent } from './directory.component';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

describe('DirectoryComponent', () => {
  let component: DirectoryComponent;
  let fixture: ComponentFixture<DirectoryComponent>;

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new Observable(),
      doc: (_id: string) => ({
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
      declarations: [ DirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});

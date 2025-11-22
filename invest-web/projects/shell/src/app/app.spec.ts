import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Header } from './ui/components/header/header';
import { MockComponents } from 'ng-mocks';
import { Footer } from './ui/components/footer/footer';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponents(Header, Footer)],
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'shell'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shell');
  });
});

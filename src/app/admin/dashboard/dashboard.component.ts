import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatIconModule, RouterLink, RouterLinkActive,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private readonly router:Router=inject(Router);
  ngOnInit(): void {
    // console.log(this.router.routerState.snapshot.root.firstChild)
  }

  show=signal<boolean>(false);

  toggle() {
    this.show.set(!this.show());
  }
}

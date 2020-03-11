import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faLayerGroup, faUser, faRoute, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
      private router: Router
  ) { }

  // ! Icon definitions
  public layerGroupIcon: IconDefinition = faLayerGroup;
  public userIcon: IconDefinition = faUser;
  public routeIcon: IconDefinition = faRoute;
  public envelopeIcon: IconDefinition = faEnvelope;
  public heartIcon: IconDefinition = faHeart;

  ngOnInit(): void {
  }

  public navigate = (newRoute: string): void => {
    this.router.navigate(['/u/', newRoute]);
  }
}

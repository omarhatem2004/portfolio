import { Component, inject, OnInit, signal } from '@angular/core';
import { IProfile } from '../../models';
import { ProfileService } from '../../services/profile.service';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  private service = inject(ProfileService);
  profile = signal<IProfile | null>(null);

  ngOnInit() {
    this.service.get().subscribe((data) => this.profile.set(data));
  }
}
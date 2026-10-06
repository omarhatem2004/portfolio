import { Component, inject, OnInit, signal } from '@angular/core';
import { IProfile } from '../../models';
import { ProfileService } from '../../services/profile.service';

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  private service = inject(ProfileService);
  profile = signal<IProfile | null>(null);

  phoneLink() {
    return 'tel:' + (this.profile()?.phone ?? '').replace(/\s/g, '');
  }
  ngOnInit() {
    this.service.get().subscribe((data) => this.profile.set(data));
  }
}
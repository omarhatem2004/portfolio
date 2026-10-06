import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models';
import { commas, lines } from '../helper';

@Component({
    selector: 'app-admin-profile',
    imports: [FormsModule],
    templateUrl: './admin-profile.html',
})
export class AdminProfile implements OnInit {
    private service = inject(ProfileService);
    message = signal('');

    aboutText = signal('');
    educationSchool = signal('');
    educationText = signal('');
    languagesText = signal('');
    contactLead = signal('');
    email = signal('');
    phone = signal('');
    linkedin = signal('');
    linkedinLabel = signal('');
    github = signal('');

    ngOnInit() {
        this.service.get().subscribe((p) => {
            if (!p) return;
            this.aboutText.set(p.aboutParagraphs.join('\n'));
            this.educationSchool.set(p.educationSchool);
            this.educationText.set(p.educationLines.join('\n'));
            this.languagesText.set(p.languages.join(', '));
            this.contactLead.set(p.contactLead);
            this.email.set(p.email);
            this.phone.set(p.phone);
            this.linkedin.set(p.linkedin);
            this.linkedinLabel.set(p.linkedinLabel);
            this.github.set(p.github);
        });
    }

    save() {
        const body: IProfile = {
            aboutParagraphs: lines(this.aboutText()),
            educationSchool: this.educationSchool(),
            educationLines: lines(this.educationText()),
            languages: commas(this.languagesText()),
            contactLead: this.contactLead(),
            email: this.email(),
            phone: this.phone(),
            linkedin: this.linkedin(),
            linkedinLabel: this.linkedinLabel(),
            github: this.github(),
        };
        this.service.update(body).subscribe({
            next: () => this.message.set('Saved'),
            error: (e) => this.message.set(e.error?.message ?? 'Failed to save'),
        });
    }
}
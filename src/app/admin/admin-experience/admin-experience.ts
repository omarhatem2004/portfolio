import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import { IJob } from '../../models';
import { lines } from '../helper';

@Component({
    selector: 'app-admin-experience',
    imports: [FormsModule],
    templateUrl: './admin-experience.html',
})
export class AdminExperience implements OnInit {
    private service = inject(ExperienceService);
    jobs = signal<IJob[]>([]);
    editingId = signal<string | null>(null);
    message = signal('');

    title = signal('');
    org = signal('');
    period = signal('');
    bulletsText = signal('');

    ngOnInit() { this.load(); }

    load() {
        this.service.getAll().subscribe((data) => this.jobs.set(data));
    }

    edit(job: IJob) {
        this.editingId.set(job._id ?? null);
        this.title.set(job.title);
        this.org.set(job.org);
        this.period.set(job.period);
        this.bulletsText.set(job.bullets.join('\n'));
    }

    reset() {
        this.editingId.set(null);
        this.title.set('');
        this.org.set('');
        this.period.set('');
        this.bulletsText.set('');
    }

    save() {
        const body: IJob = {
            title: this.title(),
            org: this.org(),
            period: this.period(),
            bullets: lines(this.bulletsText()),
        };
        const id = this.editingId();
        const request = id ? this.service.update(id, body) : this.service.create(body);
        request.subscribe({
            next: () => { this.reset(); this.load(); this.message.set('Saved'); },
            error: (e) => this.message.set(e.error?.message ?? 'Failed to save'),
        });
    }

    remove(job: IJob) {
        if (job._id && confirm(`Delete "${job.title}"?`)) {
            this.service.remove(job._id).subscribe(() => this.load());
        }
    }
}
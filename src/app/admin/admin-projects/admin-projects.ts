import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { IProject } from '../../models';
import { commas, lines } from '../helper';

@Component({
    selector: 'app-admin-projects',
    imports: [FormsModule],
    templateUrl: './admin-projects.html',
})
export class AdminProjects implements OnInit {
    private service = inject(ProjectsService);
    projects = signal<IProject[]>([]);
    editingId = signal<string | null>(null);
    message = signal('');

    featured = signal(false);
    badge = signal('');
    title = signal('');
    subtitle = signal('');
    description = signal('');
    bulletsText = signal('');
    tagsText = signal('');

    ngOnInit() { this.load(); }

    load() {
        this.service.getAll().subscribe((data) => this.projects.set(data));
    }

    edit(p: IProject) {
        this.editingId.set(p._id ?? null);
        this.featured.set(!!p.featured);
        this.badge.set(p.badge ?? '');
        this.title.set(p.title);
        this.subtitle.set(p.subtitle ?? '');
        this.description.set(p.description);
        this.bulletsText.set((p.bullets ?? []).join('\n'));
        this.tagsText.set(p.tags.join(', '));
    }

    reset() {
        this.editingId.set(null);
        this.featured.set(false);
        this.badge.set('');
        this.title.set('');
        this.subtitle.set('');
        this.description.set('');
        this.bulletsText.set('');
        this.tagsText.set('');
    }

    save() {
        const body: IProject = {
            featured: this.featured(),
            badge: this.badge(),
            title: this.title(),
            subtitle: this.subtitle(),
            description: this.description(),
            bullets: lines(this.bulletsText()),
            tags: commas(this.tagsText()),
        };
        const id = this.editingId();
        const request = id ? this.service.update(id, body) : this.service.create(body);
        request.subscribe({
            next: () => { this.reset(); this.load(); this.message.set('Saved'); },
            error: (e) => this.message.set(e.error?.message ?? 'Failed to save'),
        });
    }

    remove(p: IProject) {
        if (p._id && confirm(`Delete "${p.title}"?`)) {
            this.service.remove(p._id).subscribe(() => this.load());
        }
    }
}
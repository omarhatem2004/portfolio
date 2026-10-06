import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
import { ISkillGroup } from '../../models';
import { commas } from '../helper';

@Component({
    selector: 'app-admin-skills',
    imports: [FormsModule],
    templateUrl: './admin-skills.html',
})
export class AdminSkills implements OnInit {
    private service = inject(SkillsService);
    groups = signal<ISkillGroup[]>([]);
    editingId = signal<string | null>(null);
    message = signal('');

    title = signal('');
    skillsText = signal('');

    ngOnInit() { this.load(); }

    load() {
        this.service.getAll().subscribe((data) => this.groups.set(data));
    }

    edit(g: ISkillGroup) {
        this.editingId.set(g._id ?? null);
        this.title.set(g.title);
        this.skillsText.set(g.skills.join(', '));
    }

    reset() {
        this.editingId.set(null);
        this.title.set('');
        this.skillsText.set('');
    }

    save() {
        const body: ISkillGroup = {
            title: this.title(),
            skills: commas(this.skillsText()),
        };
        const id = this.editingId();
        const request = id ? this.service.update(id, body) : this.service.create(body);
        request.subscribe({
            next: () => { this.reset(); this.load(); this.message.set('Saved'); },
            error: (e) => this.message.set(e.error?.message ?? 'Failed to save'),
        });
    }

    remove(g: ISkillGroup) {
        if (g._id && confirm(`Delete "${g.title}"?`)) {
            this.service.remove(g._id).subscribe(() => this.load());
        }
    }
}
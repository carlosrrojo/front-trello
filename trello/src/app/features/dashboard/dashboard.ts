import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, ChangeDetectionStrategy, signal, computed } from "@angular/core";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { WorkspaceService, Workspace } from "../../core/services/workspace";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    
    private workspaceService = inject(WorkspaceService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);

    workspaces = signal<Workspace[]>([]);
    loading = signal(false);
    showCreateForm = signal(false);
    sidebarOpen = signal(false);
    selectedWorkspaceId = signal<string | null>(null);

    createFormGroup = this.fb.group({
        name: ['', Validators.required],
        description: ['']
    });

    workspacesLoaded = computed(() => this.workspaces().length > 0);

    ngOnInit(): void {
        this.loading.set(true);
        this.workspaceService.getWorkspaces().subscribe({
            next: (data) => {
                this.loading.set(false);
                if (data && data.length > 0) {
                    this.workspaces.set(data);
                    this.selectedWorkspaceId.set(data[0].id);
                } else {
                    this.workspaces.set([
                        { id: "1", name: "Dominacion global", description: "Plan de dominacion global a base de angular microfronts" }
                    ]);
                    this.selectedWorkspaceId.set("1");
                }
            },
            error: (err) => {
                this.loading.set(false);
                console.error('Error fetching workspaces:', err);
                this.workspaces.set([
                    { id: "1", name: "Dominacion global", description: "Plan de dominacion global a base de angular microfronts" }
                ]);
                this.selectedWorkspaceId.set("1");
            }
        });
    }

    selectWorkspace(workspace: Workspace): void {
        this.selectedWorkspaceId.set(workspace.id);
        this.router.navigate(['/workspace', workspace.id]);
    }

    createWorkspace(): void {
        if (this.createFormGroup.valid) {
            const { name, description } = this.createFormGroup.value;
            this.workspaceService.createWorkspace(name!, description || '')
                .subscribe({
                    next: (workspace) => {
                        this.workspaces.update(ws => [...ws, workspace]);
                        this.selectedWorkspaceId.set(workspace.id);
                        this.showCreateForm.set(false);
                        this.createFormGroup.reset();
                        this.router.navigate(['/workspace', workspace.id], { relativeTo: this.route });
                    },
                    error: (err) => {
                        console.error('Failed to create workspace', err);
                    }
                });
        }
    }

    cancelCreate(): void {
        this.showCreateForm.set(false);
        this.createFormGroup.reset();
    }

    toggleSidebar(): void {
        this.sidebarOpen.update(open => !open);
    }
}


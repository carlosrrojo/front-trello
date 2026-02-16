import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { WorkspaceService, Workspace } from "../../core/services/workspace";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit{
    workspaces: Workspace[] = [{id:"1",name:"Dominacion global",description:"Plan de dominacion global a base de angular microfronts"}];
    loading = true;
    showCreateForm = false;
    newWorkspaceName = '';
    newWorkspaceDescription = '';

    constructor(
        private workspaceService: WorkspaceService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.loading = false;
        this.workspaceService.getWorkspaces().subscribe({
            next: (data) => {
                this.loading = false;
                if (data && data.length > 0) {
                    this.router.navigate(['/workspace', data[0].id]);
                }else {
                    this.workspaces = [{id:"1",name:"Dominacion global",description:"Plan de dominacion global a base de angular microfronts"}];
                }
            },
            error: (err) => {
                this.loading = false;
                console.error('Error fetching workspaces:', err);
            }
        });
    }

    createWorkspace(): void{
        if (!this.newWorkspaceName.trim()) return;
        this.workspaceService.createWorkspace(this.newWorkspaceName, this.newWorkspaceDescription)
            .subscribe({
                next: (workspace) => {
                    // Checkear si esto es asi
                    this.router.navigate(['/workspace', workspace.id]);
                },
                error: (err) => {
                    console.error('Failed to create workspace', err);
                }
            });
    }

    cancelCreate(): void {
        this.showCreateForm = false;
        this.newWorkspaceName = '';
        this.newWorkspaceDescription = '';
    }
}

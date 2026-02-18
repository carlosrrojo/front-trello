import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { WorkspaceService, Workspace } from "../../core/services/workspace";
import { Board, BoardService }  from "../../core/services/board";

@Component({
    selector: 'app-workspace',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './workspace.html',
    styleUrls: ['./workspace.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceComponent implements OnInit {
    
    private route = inject(ActivatedRoute);
    private boardService = inject(BoardService);

    workspaceId = signal<string | null>(null);
    workspace = signal<Workspace | null>(null);
    boards = signal<Board[]>([]);
    loading = signal(false);

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.workspaceId.set(params.get('id'));
            if (this.workspaceId()) {
                this.loading.set(true);
                this.boardService.getBoards(this.workspaceId()!).subscribe({
                    next: (boards) => {
                        this.boards.set(boards);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error('Error fetching boards:', err);
                        this.loading.set(false);
                    }
                });
            }
        });
    }

    createBoard(): void {
        this.boardService.createBoard({
            title: 'New Board',
            workspaceId: this.workspaceId()!,
            priority: 'Medium'
        }).subscribe({
            next: (board) => {
                this.boards.update(b => [...b, board]);
            },
            error: (err) => {
                console.error('Error creating board:', err);
            }
        });
    }
}
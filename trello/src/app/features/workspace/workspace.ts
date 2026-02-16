import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { Workspace, WorkspaceService } from "../../core/services/workspace";
import { Board, BoardService }  from "../../core/services/board";

@Component({
    selector: 'app-workspace',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './workspace.html',
    styles: [`
        .workspace-container {padding: 20px;}`
    ]
})
export class WorkspaceComponent implements OnInit {
    workspaceId: string | null = null;
    workspace: Workspace | null = null;
    boards: Board[] = [];

    constructor(
        private route: ActivatedRoute,
        private boardService: BoardService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.workspaceId = params.get('id');
            if (this.workspaceId){
                this.boardService.getBoards(this.workspaceId).subscribe(boards => {
                    this.boards = boards;
                })
            }
        });
    }

    createBoard(): void {
        // Mocj board creation
        this.boardService.createBoard({
            title: 'New Board',
            workspaceId: this.workspaceId!,
            priority: 'Medium'
        }).subscribe(board => {
            this.boards.push(board);
        })
    }
}
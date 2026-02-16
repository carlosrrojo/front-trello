import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board, BoardService } from "../../core/services/board";
import { ActivatedRoute } from "@angular/router";
import { Task } from "../../core/services/task.model";


@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, DragDropModule],
    templateUrl: './board.html',
    styleUrls: ['./board.css']
})

export class BoardComponent implements OnInit{
    board: Board | null = null;

    constructor(
        private boardService: BoardService,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        const boardId = this.route.snapshot.paramMap.get('id');
        if (boardId){
            this.loadBoard(boardId);
        }
    }

    loadBoard(boardId: string): void {
        this.boardService.getBoard(boardId).subscribe(b => {
            this.board = b;
        });
    }

    getTasks(listId: string): Task[] {
        if (!this.board) return [];
        const list = this.board.lists.find( l => l.id === listId);
        return list ? list.tasks : [];
    }

    getPriorityClass(priority: string | undefined): string {
        if (!priority) return 'priority-low';
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            default: return 'priority-low'
        }
    }

    drop(event: CdkDragDrop<Task[]>, listId: string): void {
        if (event.previousContainer === event.container){
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            )
        }
    }
}
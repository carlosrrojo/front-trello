import { Injectable } from "@angular/core";
import { ApiService } from "./api";
import { Observable, of } from "rxjs";
import { Task } from './task.model';

export interface Board{
    id: string;
    title: string;
    workspaceId: string;
    priority: 'Low' | 'Medium' | 'High';
    lists: BoardList[];
}

export interface BoardList{
    id: string;
    title: string;
    tasks: Task[];
}

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    
    constructor(private api: ApiService){}

    getBoards(workspaceId: String): Observable<Board[]>{
        // Mock boards
        return of([
            {
                id: 'board-1',
                title: 'Project Interesante',
                workspaceId: workspaceId,
                priority: 'High',
                lists: [
                    {
                        id: 'list-1',
                        title: 'To Do',
                        tasks: [
                            { id: 't1', title: 'Setup Repo', description: 'Initial setup', priority: 'High'}
                        ]
                    },
                    {
                        id: 'list-2',
                        title: 'Doing',
                        tasks: []
                    },
                    {
                        id: 'list-3',
                        title: 'Done',
                        tasks: []
                    }
                ]
            } as Board/*
            {
                id: 'board-2',
                title: 'Marketing Campaign',
                workspaceId: workspaceId,
                priority: 'Medium',
                lists: []
            }*/
        ]);
        // return this.api.get<Board[]>(`/workspaces/${workspaceId}/boards`);
    }

    getBoard(boardId: string): Observable<Board> {
        // Mock
        return of({
            id: boardId,
            title: 'Projecto interesante',
            workspaceId: 'ws-1',
            priority: 'High',
            lists: [
                {
                    id: 'list-1',
                    title: 'To Do',
                    tasks: [
                        { id: 't1', title:'Setup Repo', description: 'Initial Setup', priority: 'High'},
                        { id: 't2', title: 'Design DB', description: 'Schem design', priority: 'Medium'}
                    ]
                },
                {
                    id: 'list-2',
                    title: 'Doing',
                    tasks: []
                },
                {
                    id: 'list-3',
                    title: 'Done',
                    tasks: []
                }
            ]
        } as Board);
        // return this.api.get<Board>(`/boards/${boardId}`);
    }
    
    createBoard(board: Partial<Board>): Observable<Board> {
        // Mock
        return of({
            id: 'new-board-' + Date.now(),
            title: board.title ||'New Board',
            workspaceId: board.workspaceId || '',
            priority: board.priority || 'Low',
            lists: [] 
        });
        // return this.api.post<Board>('/boards', board);
    }
}
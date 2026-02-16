import { Injectable } from "@angular/core";
import { ApiService } from "./api";
import { Observable } from "rxjs";


export interface Workspace {
    id: string,
    name: string,
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {
    constructor( private api: ApiService ){}

    getWorkspaces(): Observable<Workspace[]> {
        return this.api.get<Workspace[]>('/workspaces');
    }

    getWorkspace(workspaceId: string): Observable<Workspace>{
        return this.api.get<Workspace>('/workspace/{'+ workspaceId+'}')
    }
    
    createWorkspace(name: string, description: string): Observable<Workspace> {
        return this.api.post<Workspace>('/workspaces', {name, description});
    }
}
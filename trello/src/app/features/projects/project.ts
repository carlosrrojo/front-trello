import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Component, OnInit } from "@angular/core";



export interface Project {
    
}

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './project.html',
    styleUrl: './project.css'
})
export class ProjectComponent {

    constructor(
        private router: Router
    ){}
}
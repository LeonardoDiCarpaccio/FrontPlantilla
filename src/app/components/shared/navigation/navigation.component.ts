import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
    isSidebarOpen = true;
    constructor(private auth: AuthService) {}
    role: any;
    client: any;
    async ngOnInit() {
        this.client = JSON.parse(localStorage.getItem("user"));

        this.role = await this.auth.getRole();
    }
    Show: boolean = true;
    displayed: boolean = false;

    hideSidebar() {
        this.isSidebarOpen = false;
    }
    toggle() {
        this.Show = true;
    }
    display() {
        this.displayed = !this.displayed;
    }
}

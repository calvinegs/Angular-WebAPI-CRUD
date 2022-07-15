import { Component } from '@angular/core';
import { TokenStorageService } from './shared/services/token-storage.service';
import { IfDirective } from './shared/directive/if.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = []; //使用者具備的角色
  isLoggedIn = false; //用來記錄是否已登入系統的變數
  // showAdminFunction = false;  //記錄是否有｀管理者｀角色的變數
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    // 若在 session storage 中有有效的 token 則表示已有正常的登入系統
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      // this.roles = user.roles;
      // this.showAdminFunction = this.roles.includes("ADMIN");
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut(); //清除 session storage
    location.reload();
  }
}

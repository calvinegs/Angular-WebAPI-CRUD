import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Directive({
  selector: '[csdIf]'
})
export class IfDirective {
  private roles: string[] = []; //使用者具備的角色
  constructor(private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.displayTemplate();
  }

  private displayTemplate() {
    this.vcr.clear();

    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    if (this.roles.includes("ADMIN")) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
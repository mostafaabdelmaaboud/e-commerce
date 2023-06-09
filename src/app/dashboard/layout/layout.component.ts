import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthState } from 'src/app/auth/store/state/login.state';
import { Logout } from 'src/app/auth/store/actions/login.actions';
import { CartService } from '../categories/services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  selectedLang: string = "en";
  public translate = inject(TranslateService);
  public totalItems = inject(CartService);
  langs = [
    { value: 'ar', viewValue: this.translate.instant("login.arabic") },
    { value: 'en', viewValue: this.translate.instant("login.english") },
  ];
  @Select(AuthState.getAuthLogin) stateAuth$!: Observable<String | null>;
  public isCollapsed = true;

  constructor(private store: Store, private router: Router) {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
    this.translate.setDefaultLang(this.selectedLang);
    this.translate.use(this.selectedLang);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lang) => {
      this.langs[0].viewValue = lang.translations.login.arabic;
      this.langs[1].viewValue = lang.translations.login.english;
    })
    this.totalItems.cartItemsCheckStorage();
  }
  logout() {
    this.store.dispatch(new Logout()).subscribe(logout => {
      this.router.navigate(["/login"]);
    })
  }
  selectChange(selectLang: any) {
    document.documentElement.dir = selectLang.value == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectLang.value;
    this.translate.use(selectLang.value);
    localStorage.setItem("currentLang", selectLang.value);
  }

}

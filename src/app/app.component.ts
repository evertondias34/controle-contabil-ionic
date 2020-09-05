import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Clientes",
      url: "/cliente-view",
      icon: "folder",
      colorName: "yellow",
    },
    {
      title: "Lançamentos",
      url: "/lancamento-view",
      icon: "receipt",
      colorName: "green",
    },
    {
      title: "Períodos",
      url: "/periodo-view",
      icon: "calendar",
      colorName: "blue",
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.navController.navigateRoot("/");
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}

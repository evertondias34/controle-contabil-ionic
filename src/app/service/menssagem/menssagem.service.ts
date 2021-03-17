import { Injectable } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class MenssagemService {
  public loading: any;

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController
  ) {}

  alerta(mensagem: string) {
    this.sucessoAlert(mensagem);
  }

  async sucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 10000,
      position: "top",
      color: "success",
    });
    toast.present();
  }

  private async sucessoAlert(mensagem: string) {
    const alert = await this.alertController.create({
      header: "Sucesso",
      message: mensagem,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async error(mensagem: string) {
    // this.errorAlert(mensagem);
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 10000,
      position: "top",
      color: "danger",
    });
    toast.present();
  }

  private async errorAlert(mensagem: string) {
    const alert = await this.alertController.create({
      header: "Erro",
      message: mensagem,
      buttons: ["OK"],
    });

    await alert.present();
  }

  // confirme(mensagem:string, okHandler) {
  //   this.confirme(mensagem, okHandler, () => {})
  // }

  confirmar(mensagem: string, okHandler, cancelHandler?) {
    this.confirmeAlert(mensagem, okHandler, cancelHandler);
  }

  private async confirmeAlert(mensagem: string, okHandler, cancelHandler) {
    const alert = await this.alertController.create({
      header: "Confirmar",
      message: mensagem,
      buttons: [
        {
          text: "Cancelar",
          role: "cancelar",
          cssClass: "secondary",
          handler: (blah) => {
            if (cancelHandler) {
              cancelHandler();
            }
          },
        },
        {
          text: "Ok",
          handler: () => {
            if (okHandler) {
              okHandler();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  showLoading: boolean = false;
  async mostraLoading() {
    this.showLoading = true;
    this.loading = await this.loadingCtrl.create({
      message: "Por favor aguarde...",
      // duration: 60000,
      backdropDismiss: true,
    });

    await this.loading.present();
    //Pode ser que já mandamos esconder o componente, mas ainda nem carregou na tela, por isso temos que validar aqui.
    if (!this.showLoading) {
      this.escondeLoading();
    }
  }

  escondeLoading() {
    this.showLoading = false;
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}

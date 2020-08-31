import { NativeStorage } from "@ionic-native/native-storage";
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  constructor(private nativeStorage: NativeStorage) {}

  setItem(reference, data) {
    return this.nativeStorage.setItem(reference, data);
  }
  getItem(reference) {
    return this.nativeStorage.getItem(reference);
  }
}

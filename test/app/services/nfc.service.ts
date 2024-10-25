import { Observable } from '@nativescript/core';
import { Nfc, NfcTagData } from '@nativescript/nfc';

export class NfcService extends Observable {
  private nfc: Nfc;

  constructor() {
    super();
    this.nfc = new Nfc();
  }

  public async isEnabled(): Promise<boolean> {
    try {
      return await this.nfc.enabled();
    } catch (error) {
      console.error('NFC kontrolü başarısız:', error);
      return false;
    }
  }

  public async startScanning(): Promise<void> {
    try {
      await this.nfc.setOnNdefDiscoveredListener((data: NfcTagData) => {
        this.notify({
          eventName: 'nfcTagDiscovered',
          object: this,
          data: data
        });
      });
    } catch (error) {
      console.error('NFC tarama başlatılamadı:', error);
      throw error;
    }
  }

  public async stopScanning(): Promise<void> {
    try {
      await this.nfc.setOnNdefDiscoveredListener(null);
    } catch (error) {
      console.error('NFC tarama durdurulamadı:', error);
      throw error;
    }
  }
}
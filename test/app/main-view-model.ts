import { Observable } from '@nativescript/core';
import { NfcService } from './services/nfc.service';
import { PaymentService } from './services/payment.service';
import { Card, CardModel } from './models/card.model';

export class MainViewModel extends Observable {
  private nfcService: NfcService;
  private paymentService: PaymentService;
  private currentCard: Card | null = null;

  constructor() {
    super();

    this.nfcService = new NfcService();
    this.paymentService = new PaymentService();

    // Varsayılan değerleri ayarla
    this.set('cardStatus', 'Lütfen NFC kartınızı okutun');
    this.set('balance', '0,00 ₺');
    this.set('isCardActive', false);
    this.set('lastTransaction', 'Henüz işlem yapılmadı');

    this.initializeNfc();
  }

  private async initializeNfc() {
    const isEnabled = await this.nfcService.isEnabled();
    if (!isEnabled) {
      this.set('cardStatus', 'NFC cihazınızda aktif değil');
      return;
    }

    this.nfcService.on('nfcTagDiscovered', (args: any) => {
      this.handleNfcTag(args.data);
    });
  }

  private async handleNfcTag(tagData: any) {
    // Gerçek uygulamada, kart backend servisi ile doğrulanacak
    this.currentCard = new CardModel({
      id: tagData.id || '123',
      userId: 'user123',
      cardNumber: 'KART-001',
      balance: 100,
      isActive: true,
      lastUsed: new Date()
    });

    this.updateCardDisplay();
  }

  private updateCardDisplay() {
    if (this.currentCard) {
      this.set('cardStatus', 'Kart algılandı');
      this.set('balance', `${this.currentCard.balance.toFixed(2)} ₺`);
      this.set('isCardActive', this.currentCard.isActive);
    }
  }

  async onScanTap() {
    try {
      await this.nfcService.startScanning();
      this.set('cardStatus', 'NFC kart taranıyor...');
    } catch (error) {
      this.set('cardStatus', 'NFC tarama başlatılamadı');
    }
  }

  async onTopUpTap() {
    if (!this.currentCard) {
      this.set('cardStatus', 'Lütfen önce kart okutun');
      return;
    }

    const amount = 50; // Gerçek uygulamada kullanıcı girişi olacak
    const success = await this.paymentService.topUpBalance(this.currentCard, amount);

    if (success) {
      this.updateCardDisplay();
      this.set('lastTransaction', `${amount.toFixed(2)} ₺ başarıyla yüklendi`);
    } else {
      this.set('lastTransaction', 'Yükleme başarısız oldu');
    }
  }

  async onPaymentTap() {
    if (!this.currentCard) {
      this.set('cardStatus', 'Lütfen önce kart okutun');
      return;
    }

    const amount = 10; // Gerçek uygulamada satın alma tutarı olacak
    const success = await this.paymentService.processPayment(this.currentCard, amount);

    if (success) {
      this.updateCardDisplay();
      this.set('lastTransaction', `${amount.toFixed(2)} ₺ ödeme yapıldı`);
    } else {
      this.set('lastTransaction', 'Ödeme başarısız oldu');
    }
  }
}
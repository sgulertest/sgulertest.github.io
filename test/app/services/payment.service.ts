import { Observable } from '@nativescript/core';
import { Card } from '../models/card.model';

export class PaymentService extends Observable {
  async processPayment(card: Card, amount: number): Promise<boolean> {
    try {
      if (!card.isActive) {
        throw new Error('Kart aktif değil');
      }

      if (card.balance < amount) {
        throw new Error('Yetersiz bakiye');
      }

      // Gerçek uygulamada, ödeme işlemi için API çağrısı yapılacak
      card.balance -= amount;
      card.lastUsed = new Date();

      return true;
    } catch (error) {
      console.error('Ödeme başarısız:', error);
      return false;
    }
  }

  async topUpBalance(card: Card, amount: number): Promise<boolean> {
    try {
      if (!card.isActive) {
        throw new Error('Kart aktif değil');
      }

      // Gerçek uygulamada, yükleme işlemi için API çağrısı yapılacak
      card.balance += amount;
      card.lastUsed = new Date();

      return true;
    } catch (error) {
      console.error('Yükleme başarısız:', error);
      return false;
    }
  }
}
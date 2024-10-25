import { Card } from '../models/Card';

export function usePayment() {
  const processPayment = async (card: Card, amount: number): Promise<boolean> => {
    try {
      if (!card.isActive) {
        throw new Error('Kart aktif değil');
      }

      if (card.balance < amount) {
        throw new Error('Yetersiz bakiye');
      }

      // Gerçek uygulamada, ödeme işlemi için API çağrısı yapılacak
      return true;
    } catch (error) {
      console.error('Ödeme başarısız:', error);
      return false;
    }
  };

  const topUpBalance = async (card: Card, amount: number): Promise<boolean> => {
    try {
      if (!card.isActive) {
        throw new Error('Kart aktif değil');
      }

      // Gerçek uygulamada, yükleme işlemi için API çağrısı yapılacak
      return true;
    } catch (error) {
      console.error('Yükleme başarısız:', error);
      return false;
    }
  };

  return {
    processPayment,
    topUpBalance
  };
}
import { useState, useEffect } from 'react';
import { Card, CardModel } from '../models/Card';

interface UseNfcProps {
  onCardDetected: (card: Card) => void;
}

export function useNfc({ onCardDetected }: UseNfcProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    checkNfcAvailability();
  }, []);

  const checkNfcAvailability = () => {
    // Web NFC API kontrolü
    if ('NDEFReader' in window) {
      setIsEnabled(true);
    }
  };

  const startScanning = async () => {
    try {
      // @ts-ignore - Web NFC API henüz TypeScript tanımlarında yok
      const ndef = new window.NDEFReader();
      await ndef.scan();

      ndef.addEventListener("reading", ({ serialNumber }: any) => {
        // Gerçek uygulamada, kart bilgileri NFC'den okunacak
        const mockCard = new CardModel({
          id: serialNumber || '123',
          userId: 'user123',
          cardNumber: 'KART-001',
          balance: 100,
          isActive: true,
          lastUsed: new Date()
        });

        onCardDetected(mockCard);
      });
    } catch (error) {
      console.error('NFC tarama hatası:', error);
      throw error;
    }
  };

  return {
    isEnabled,
    startScanning
  };
}
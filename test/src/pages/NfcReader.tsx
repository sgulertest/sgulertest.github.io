import React, { useState, useEffect } from 'react';
import { Card } from '../models/Card';
import { useNfc } from '../hooks/useNfc';
import { usePayment } from '../hooks/usePayment';

function NfcReader() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardStatus, setCardStatus] = useState('Lütfen NFC kartınızı okutun');
  const [lastTransaction, setLastTransaction] = useState('Henüz işlem yapılmadı');

  const { isEnabled, startScanning } = useNfc({
    onCardDetected: (card) => {
      setCurrentCard(card);
      setCardStatus('Kart algılandı');
    }
  });

  const { processPayment, topUpBalance } = usePayment();

  useEffect(() => {
    if (!isEnabled) {
      setCardStatus('NFC tarayıcı bulunamadı');
    }
  }, [isEnabled]);

  const handleScanTap = async () => {
    try {
      setCardStatus('NFC kart taranıyor...');
      await startScanning();
    } catch (error) {
      setCardStatus('NFC tarama başlatılamadı');
    }
  };

  const handleTopUpTap = async () => {
    if (!currentCard) {
      setCardStatus('Lütfen önce kart okutun');
      return;
    }

    const amount = 50;
    const success = await topUpBalance(currentCard, amount);

    if (success) {
      setCurrentCard(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
      setLastTransaction(`${amount.toFixed(2)} ₺ başarıyla yüklendi`);
    } else {
      setLastTransaction('Yükleme başarısız oldu');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg text-center mb-6">{cardStatus}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-lg">Bakiye:</div>
          <div className="text-lg font-bold text-right">
            {currentCard ? `${currentCard.balance.toFixed(2)} ₺` : '0,00 ₺'}
          </div>
          <div className="text-lg">Kart Durumu:</div>
          <div className={`text-lg font-bold text-right ${
            currentCard?.isActive ? 'text-green-600' : 'text-red-600'
          }`}>
            {currentCard?.isActive ? 'Aktif' : 'Pasif'}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleScanTap}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            NFC Kart Tara
          </button>

          <button
            onClick={handleTopUpTap}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Bakiye Yükle
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">{lastTransaction}</p>
      </div>
    </div>
  );
}

export default NfcReader;
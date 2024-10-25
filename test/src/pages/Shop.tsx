import React, { useState } from 'react';
import { Product } from '../models/Product';
import { Card } from '../models/Card';
import { useNfc } from '../hooks/useNfc';
import { usePayment } from '../hooks/usePayment';

function Shop() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Kahve',
      price: 15,
      description: 'Taze çekilmiş kahve',
      image: '☕'
    },
    {
      id: '2',
      name: 'Sandviç',
      price: 25,
      description: 'Taze hazırlanmış sandviç',
      image: '🥪'
    },
    {
      id: '3',
      name: 'Su',
      price: 5,
      description: '500ml su',
      image: '💧'
    }
  ]);

  const { processPayment } = usePayment();
  const { startScanning } = useNfc({
    onCardDetected: (card) => setCurrentCard(card)
  });

  const handlePurchase = async (product: Product) => {
    if (!currentCard) {
      alert('Lütfen önce kart okutun');
      return;
    }

    const success = await processPayment(currentCard, product.price);
    if (success) {
      alert(`${product.name} başarıyla satın alındı!`);
      setCurrentCard(prev => prev ? { ...prev, balance: prev.balance - product.price } : null);
    } else {
      alert('Satın alma işlemi başarısız oldu');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Kart Durumu</h2>
            <p className="text-gray-600">
              {currentCard 
                ? `Bakiye: ${currentCard.balance.toFixed(2)} ₺` 
                : 'Kart okutulmadı'}
            </p>
          </div>
          <button
            onClick={() => startScanning()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kart Okut
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="text-4xl mb-2 text-center">{product.image}</div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{product.price.toFixed(2)} ₺</span>
                <button
                  onClick={() => handlePurchase(product)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Satın Al
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
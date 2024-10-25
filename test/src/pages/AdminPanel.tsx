import React, { useState } from 'react';
import { Card } from '../models/Card';
import { User } from '../models/User';

function AdminPanel() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      userId: 'user1',
      cardNumber: 'KART-001',
      balance: 100,
      isActive: true,
      lastUsed: new Date()
    },
    {
      id: '2',
      userId: 'user2',
      cardNumber: 'KART-002',
      balance: 250,
      isActive: true,
      lastUsed: new Date()
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'user1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      cardIds: ['1']
    },
    {
      id: 'user2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      cardIds: ['2']
    }
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kayıtlı Kartlar</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kart No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bakiye
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Kullanım
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map(card => {
                const user = users.find(u => u.id === card.userId);
                return (
                  <tr key={card.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{card.cardNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{card.balance.toFixed(2)} ₺</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        card.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {card.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {card.lastUsed.toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Kullanıcılar</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kart Sayısı
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.cardIds.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  balance: number;
  isActive: boolean;
  lastUsed: Date;
}

export class CardModel implements Card {
  id: string;
  userId: string;
  cardNumber: string;
  balance: number;
  isActive: boolean;
  lastUsed: Date;

  constructor(data: Partial<Card>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.cardNumber = data.cardNumber || '';
    this.balance = data.balance || 0;
    this.isActive = data.isActive ?? true;
    this.lastUsed = data.lastUsed || new Date();
  }
}
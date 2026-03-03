export * from './lib/shared-types';

/**
 * Interface représentant un utilisateur du Fitness Premium Hub.
 */
export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'COACH' | 'MEMBER';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface représentant un produit (ex: abonnement mensuel, équipement sportif).
 */
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface représentant une commande passée par un utilisateur.
 */
export interface Order {
    _id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
    }>;
    totalAmount: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
    createdAt: Date;
    updatedAt: Date;
}

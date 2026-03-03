import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

export interface LandingProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  productType: 'PROGRAM' | 'SUBSCRIPTION';
  isFeatured: boolean;
  coverUrl: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  // Array Signal : Angular v21+
  products: WritableSignal<LandingProduct[]> = signal([
    {
      id: 'p1',
      title: 'Programme Hypertrophie',
      description: 'Prenez en masse musculaire grâce à un programme structuré sur 12 semaines pour intermédiaires et avancés.',
      price: 49.99,
      productType: 'PROGRAM',
      isFeatured: true,
      coverUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p2',
      title: 'Abonnement Elite Coaching',
      description: 'Accédez à tous les programmes en illimité et une session VIP hebdomadaire avec nos entraîneurs professionnels.',
      price: 29.99,
      productType: 'SUBSCRIPTION',
      isFeatured: false,
      coverUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p3',
      title: 'Shredded en 8 Semaines',
      description: 'Programme de définition extrême. Plan nutritionnel strict et cardio HIIT.',
      price: 39.99,
      productType: 'PROGRAM',
      isFeatured: false,
      coverUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  isLoading = signal(false);

  simulateCart(productId: string) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Added to cart : ', productId);
    }, 800);
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';
import { CheckoutService } from '../../services/checkout.service';
import { NotificationService } from '../../core/services/notification.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Product } from '@fitness-premium-hub/shared-types';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  private productService = inject(ProductService);
  private checkoutService = inject(CheckoutService);
  private notificationService = inject(NotificationService);

  products = signal<Product[]>([]);
  isLoading = signal(true);
  purchasingId = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.notificationService.error('Erreur lors du chargement des programmes');
        this.isLoading.set(false);
      }
    });
  }

  buyProduct(product: Product) {
    this.purchasingId.set(product._id || null);
    this.checkoutService.simulateCheckout(product._id || '').subscribe({
      next: () => {
        this.purchasingId.set(null);
        this.notificationService.success(`Paiement simulé réussi pour ${product.name} !`);
        // Redirection logique vers dashboard
      },
      error: (err) => {
        this.purchasingId.set(null);
        this.notificationService.error(err.error?.message || 'Erreur lors du paiement');
      }
    });
  }
}

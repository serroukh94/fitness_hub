import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="premium-footer">
      <div class="footer-content">
        <p>&copy; 2026 Premium Fitness Hub. All rights reserved. Unleash your potential.</p>
      </div>
    </footer>
  `,
  styles: [`
    .premium-footer {
      background-color: var(--bg-color-surface);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 40px 0;
      text-align: center;
      margin-top: auto;
      
      p {
        color: var(--text-muted);
        font-size: 0.9rem;
      }
    }
  `]
})
export class FooterComponent {}

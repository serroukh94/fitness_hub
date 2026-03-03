import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CoachingService, CheckIn } from '../../services/coaching.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private coachingService = inject(CoachingService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  user = this.authService.currentUser;
  checkIns = signal<CheckIn[]>([]);
  checkInForm: FormGroup;
  isSubmitting = signal(false);

  constructor() {
    this.checkInForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(20), Validators.max(300)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.loadCheckIns();
  }

  loadCheckIns() {
    this.coachingService.getCheckIns().subscribe({
      next: (data) => this.checkIns.set(data),
      error: () => this.notificationService.error('Impossible de charger l\'historique')
    });
  }

  submitCheckIn() {
    if (this.checkInForm.valid) {
      this.isSubmitting.set(true);
      this.coachingService.submitCheckIn(this.checkInForm.value).subscribe({
        next: (newCheckIn) => {
          this.checkIns.update(list => [newCheckIn, ...list]);
          this.checkInForm.reset();
          this.isSubmitting.set(false);
          this.notificationService.success('Check-in validé avec succès !');
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.notificationService.error(err.error?.message || 'Erreur lors du check-in');
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.notificationService.info('Vous êtes déconnecté');
  }
}

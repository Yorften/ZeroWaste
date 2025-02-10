import { Component, computed } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-global-notification',
  templateUrl: './global-notification.component.html',
})
export class GlobalNotificationComponent {

  notificationMessage = computed(() => this.notificationService.notification());
  notificationType = computed(() => this.notificationService.type());

  constructor(private notificationService: NotificationService) { }

  closeNotification() {
    console.log("clicked");
    this.notificationService.clearNotification();
  }

}

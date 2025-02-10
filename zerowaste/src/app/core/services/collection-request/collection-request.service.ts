import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { CollectionRequest, RequestStatus } from '../../../shared/models/collection-request.model';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private storageKey = 'collectionRequests';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Helper to get all collection requests
  private getRequestsFromStorage(): CollectionRequest[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Helper function to save the new collection of collection requests
  private saveRequestsToStorage(requests: CollectionRequest[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(requests));
    }
  }

  private generateUniqueId(): string {
    return `req-${Date.now()}-${Math.random().toString(36)}`;
  }

  /**
   * Create a new CollectionRequest.
   * Enforces:
   *  - Maximum 3 ongoing requests (statuses ON_HOLD, OCCUPIED, IN_PROGRESS) per user.
   *  - Total estimated weight of ongoing requests must not exceed 10,000.
   */
  createCollectionRequest(newRequest: CollectionRequest): Observable<CollectionRequest> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const requests = this.getRequestsFromStorage();

    const ongoingStatuses = [
      RequestStatus.ON_HOLD,
      RequestStatus.OCCUPIED,
      RequestStatus.IN_PROGRESS
    ];

    const ongoingRequests = requests.filter(req =>
      req.user_id === newRequest.user_id && ongoingStatuses.includes(req.status)
    );

    if (ongoingRequests.length >= 3) {
      return throwError(() => new Error('Maximum 3 ongoing requests allowed.'));
    }

    const currentTotalWeight = ongoingRequests.reduce((total, req) => total + req.estimated_weight, 0);
    if (currentTotalWeight + newRequest.estimated_weight > 10000) {
      const weightLeft = currentTotalWeight + newRequest.estimated_weight - 10000;
      return throwError(() => new Error('Total collection weight limit exceeded (10kg). Estimated weight left is ' + weightLeft + "g."));
    }

    // If no id is provided, generate one
    if (!newRequest.id) {
      newRequest.id = this.generateUniqueId();
    }

    requests.push(newRequest);
    this.saveRequestsToStorage(requests);
    return of(newRequest);
  }


  getCollectionRequests(userId?: string): Observable<CollectionRequest[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }
    const requests = this.getRequestsFromStorage();
    if (userId) {
      return of(requests.filter(req => req.user_id === userId));
    }
    return of(requests);
  }


  updateCollectionRequest(update: Update<CollectionRequest>): Observable<CollectionRequest> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const requests = this.getRequestsFromStorage();
    const index = requests.findIndex(req => req.id === update.id);
    if (index === -1) {
      return throwError(() => new Error('Collection request not found'));
    }

    // Merge the changes into the existing collection request.
    const updatedRequest = { ...requests[index], ...update.changes };
    requests[index] = updatedRequest;
    this.saveRequestsToStorage(requests);
    return of(updatedRequest);
  }


  // Delete a collection request by id
  deleteCollectionRequest(id: string): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }
    const requests = this.getRequestsFromStorage();
    const updatedRequests = requests.filter(req => req.id !== id);
    if (updatedRequests.length === requests.length) {
      return throwError(() => new Error('Collection request not found'));
    }
    this.saveRequestsToStorage(updatedRequests);
    return of(true);
  }
}

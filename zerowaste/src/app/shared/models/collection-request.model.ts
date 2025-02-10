export enum MaterialType {
    PLASTIC, GLASS, PAPER, METAL
}

export enum RequestStatus {
    ON_HOLD, OCCUPIED, IN_PROGRESS, ACCEPTED, REJECTED
}

export interface CollectionRequest {
    id: string,
    type: MaterialType,
    estimated_weight: number,
    collect_address: string,
    collect_date: Date,
    status: RequestStatus,
    user_id: string,
}
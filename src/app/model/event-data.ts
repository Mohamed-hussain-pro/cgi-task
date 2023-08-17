export interface EventData {
    event_id: {
      $oid: string;
    };
    timestamp: string;
    machine_id: string;
    machine_name: string;
    temperature: number;
  }
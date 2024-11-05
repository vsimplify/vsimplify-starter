export type MissionProcess = 'SEQUENTIAL' | 'PARALLEL' | 'HYBRID' | 'CONDITIONAL' | 'EVENT_DRIVEN';

export interface Database {
  public: {
    Tables: {
      Mission: {
        Row: {
          // ... other fields ...
          process: MissionProcess;
        };
        // ... other definitions ...
      };
      // ... other tables ...
    };
  };
} 
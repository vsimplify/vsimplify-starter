export type Tables = {
  credits: {
    id: number;
    created_at: string;
    credits: number;
    user_id: string;
  };

  images: {
    id: number;
    modelId: number;
    uri: string;
    created_at: string;
  };

  models: {
    id: number;
    name: string | null;
    type: string | null;
    created_at: string;
    user_id: string | null;
    status: string;
    modelId: string | null;
  };

  samples: {
    id: number;
    uri: string;
    modelId: number;
    created_at: string;
  };
};


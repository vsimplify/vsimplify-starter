type  Tool =
  | "DUCK_DUCK_GO_SEARCH"
  | "SEMANTIC_SCHOLAR"
  | "WIKIDATA"
  | "WIKIPEDIA"
  | "YAHOO_FINANCE"
  | "YOUTUBE_SEARCH";

export type Agent = {
  id?: number | string;
  role: string;
  goal: string;
  backstory?: string | null;
  tools: Array<Tool>;
  allowDelegation: boolean;
  verbose: boolean;
  memory: boolean;
  image?: string | null;
  creator: string;
  email: string;
  title: string;
	domainId: number;
};

export type Project = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    enableFormatting: boolean;
    enableLinting: boolean;
    enablePerformanceChecks: boolean;
    enableSecurityChecks: boolean;
    eqeqeq: boolean;
    indent: number;
    jsdoc: boolean;
    maxLineLength: number;
    noConsole: boolean;
    noUnusedVars: boolean;
    quotes: string;
    tabSize: number;
    configuration?: Configuration;
  };
  
export type Configuration = {
    id: string;
    tabSpace: number;
    useJsDocs: boolean;
    useSemicolons: boolean;
    useSingleQuotes: boolean;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    apiKey?: ApiKey;
  };
  
export type ApiKey = {
    id: string;
    key: string;
    configurationId: string;
    createdAt: Date;
    expiresAt?: Date;
    lastUsed?: Date;
  };
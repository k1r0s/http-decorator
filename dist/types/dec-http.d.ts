import { IAdviceSignature } from 'kaop-ts';
export interface HttpGlobals {
    base: string;
}
export declare const config: HttpGlobals;
export declare const http: (method?: string, headers?: any) => IAdviceSignature<any, any>;

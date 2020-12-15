export const ERRORS_CODES = new Map(
    [
        ['BENEFICIARY_ADD_FAIL', 'BENEFICIARY_ADD_FAIL']
    ]
);

export interface Token {
    refresh: string,
    access: string
}

/**
 * Handle HTTP requests/responses
 */
export class HttpHandler {
    static async fetchJson(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const response = await fetch(input, init);

        return response.json();
    }
}

export default HttpHandler;
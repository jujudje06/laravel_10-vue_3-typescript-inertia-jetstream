import ziggyRoute, {Config as ZiggyConfig} from "ziggy-js";
import {AxiosInstance} from "axios";

export {};
declare global {
    export namespace inertia {
        export interface Props {
            user: {
                id: number;
                name: string;
                email: string;
                created_at: Date;
                updated_at: Date;
            };
            jetstream: {
                [key: string]: boolean;
            };
            errorBags: unknown;
            errors: unknown;
        }
    }

    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof ziggyRoute;
    }
}


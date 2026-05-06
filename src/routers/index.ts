
import { RouteConfig } from '../types/global';
import AuthRoutes from './authRoutes';
import { GlobalAdminRoutes } from './globalAdminRoutes';
import { globalMerchantRoutes } from './globalMerchantRoutes';
import { GlobalUserRoutes } from './globalUserRoutes';

// router file
export const Routes: RouteConfig[] = [
    //  here routes will be defined
];

// export const AdminRoutes: any[] = [...GlobalAdminRoutes];
export const AdminRoutes: any[] = [...AuthRoutes, ...GlobalAdminRoutes];
// export const MerchantRoutes: any[] = [...AuthRoutes, ...globalMerchantRoutes];
// export const UserRoutes: any[] = [...AuthRoutes, ...GlobalUserRoutes];

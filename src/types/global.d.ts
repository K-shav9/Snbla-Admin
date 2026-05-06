// declare global props type here ************

import { RouteProps } from 'react-router-dom';

export interface PrivateLayoutProps {
    children: React.ReactElement<RouteProps>;
}
//  main routing ...
interface ComponentType {
    (): React.ReactElement;
    new (): React.ReactElement;
    string?: string;
}

export interface RouteConfig {
    path: string;
    exact?: boolean;
    layout: React.FC<PrivateLayoutProps>;
    component?: React.ReactElement;
}

type IconType = React.ReactElement; // assuming InviteAReferrerIcon returns a React element

export type SidebarMenuType = {
  id: number;
  // role: number[];
  name: string;
  path: string;
  icon: IconType;
  roleId: number[];
}

type ImageType = React.ReactElement<SVGSVGElement>; // assuming InviteAReferrerIcon returns an SVG element

export type DashboardItemType = {
  id: number;
  role: number[];
  name: string;
  path: string;
  icon: any;
}

export interface WindowWithGoogle extends Window {
  google: any;
}
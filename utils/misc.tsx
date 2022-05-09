import { CSSProperties } from "react";

type TApplication = {
    name: string;
    applicationName: string;
    width: string | number;
    height: string | number;
    top: number;
    left: number;

    index: number;
     
    isOpen: boolean;
    isZoomed: boolean;
    children: React.ReactNode;

    style?: CSSProperties;
    data?: any;
}

type TIcon = {
    type: 'icon';
    name: string;
    image: string;
    filename: string;
    
    top: number;
    left: number;
}

export type TFolderItem = {
    name: string;
    image: string;
}

export interface IFolderItems {
    [key: string]: TFolderItem;
}

export interface IIcons {
    [key: string]: TIcon
}

export interface IApplications {
    [key: string]: TApplication
}

export function stringify (object: any){
    const simpleObject: any = {};
    for (const prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

// { top: 180, left: 20, name: "team", filename: "team.txt", image: "/text-icon.png"}
// roadmap: {name: "roadmap", applicationName: "roadmap.txt", width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: null},
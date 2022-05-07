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
}

type TIcon = {
    name: string;
    image: string;
    filename: string;
    
    top: number;
    left: number;
}

export interface IIcons {
    [key: string]: TIcon
}

export interface IApplications {
    [key: string]: TApplication
}

// { top: 180, left: 20, name: "team", filename: "team.txt", image: "/text-icon.png"}
// roadmap: {name: "roadmap", applicationName: "roadmap.txt", width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: null},
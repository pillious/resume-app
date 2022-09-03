// Misc.
export type guid = string;

export enum ModState {
    Add = 0,
    Update = 1,
    Delete = 2,
}

// Schema objects
export interface IItem {
    content: string;
    order: number;
    id: guid;
}
export interface ISection {
    name: string;
    items: IItem[];
    id: guid;
}

export interface IFile {
    name: string;
    sections: ISection[];
    id: guid;
}

// API
export type ResponseSuccess = {
    data: FileResponseData | Record<string, never>;
};

export type FileResponseData = {
    files?: IFile[];
    file?: IFile;
};

export type ResponseError = {
    error: {
        code: number;
        message: unknown | string;
    };
};

// Sidebar views
export enum ActiveView {
    HomeView = 0,
    FileSystemView = 1,
}

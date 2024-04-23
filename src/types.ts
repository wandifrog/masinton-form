export type MasintonForm = {
    [key: string]: MasintonField;
}

export type MasintonField = {
    value: any;
    error: boolean;
    errorMessage: string;
}

export type MasintonValidation = {
    [key: string]: MasintonValidationRule[];
}

export type MasintonValidationRule = {
    rule: RegExp;
    errorMessage: string;
}

export type MasintonValidationOptions = {
    ignoreValidation?: string[];
}

export type MasintonData = {
    [key: string]: any;
}

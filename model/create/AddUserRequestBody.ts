export interface AddUserRequestBody {
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    gender: string;
    email: string;
    password: string;

    // Optional fields
    maidenName?: string;
    birthDate?: string;
    image?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
    hair?: {
        color: string;
        type: string;
    };
    ip?: string;
    address?: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country: string;
    };
    macAddress?: string;
    university?: string;
    bank?: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company?: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
    };
    ein?: string;
    ssn?: string;
    userAgent?: string;
    crypto?: {
        coin: string;
        wallet: string;
        network: string;
    };
    role?: string;
}
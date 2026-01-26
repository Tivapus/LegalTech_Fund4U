interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;   
}

export const users: User[] = [ 
    {
        id: "1",
        name: "Investor",
        email: "investor@fund4u.com",
        password: "investor",
        role: "investor",
    },
    {
        id: "2",
        name: "SME",
        email: "sme@fund4u.com",
        password: "sme",
        role: "sme",
    },
    {
        id: "3",
        name: "Admin",
        email: "admin@fund4u.com",
        password: "admin",
        role: "admin",
    }
];
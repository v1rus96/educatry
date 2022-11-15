import { Offer } from "./offer";

export class Request {
    id: string;
    description: string;
    date: string;
    time: string;
    studentLevel: string;
    numberOfStudents: number;
    status: string;
    offers: Offer[];
}
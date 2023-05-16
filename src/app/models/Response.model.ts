import { Usuario } from "./Usuario.models";

export class Response
{
    page: number | undefined;
    per_page: number | undefined;
    total: number | undefined;
    total_pages: number | undefined;
    data!: Usuario[];
    support: string | undefined;
}

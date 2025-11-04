import { ColumnConfig } from "@app/shared";

export const headersColumns:ColumnConfig[] = [
    { key: 'idTasks', header: 'ID', type: 'text' },
    { key: 'title', header: 'Tarea', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'userCreated', header: 'Creada Por', type: 'text' },
    { key: 'userAssigned', header: 'Asignada A', type: 'text' },
    { key: 'createdAt', header: 'Fecha creación', type: 'date' },
    { key: 'active', header: 'Estado', type: 'booleanBadge' },
    { key: 'logsCount', header: 'Bitacoras', type: 'link' },
];
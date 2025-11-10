import { apiRequest } from './apiClient';

export interface Template {
    id: number;
    name: string;
    description: string;
    category: string;
    duration: number;
    isPopular: boolean;
    createdAt: string;
    fieldsCount: number;
    fields?: TemplateField[];
}

export interface TemplateField {
    id: number;
    templateId: number;
    stageNumber: number;
    fieldOrder: number;
    label: string;
    inputType: string;
    fieldOptions: string | null;
    rationale: string;
    isRequired: boolean;
    minLength: number | null;
    maxLength: number | null;
    mustBePositive: boolean;
    mustBeValidUrl: boolean;
    mustBeBetween0And100: boolean;
    createdAt: string;
}

export interface CreateTemplateRequest {
    name: string;
    description: string;
    category: string;
    duration: number;
    isPopular: boolean;
}

export interface UpdateTemplateRequest {
    name: string;
    description: string;
    category: string;
    duration: number;
    isPopular: boolean;
}

export interface CreateTemplateFieldRequest {
    templateId: number;
    stageNumber: number;
    fieldOrder: number;
    label: string;
    inputType: string;
    fieldOptions: string | null;
    rationale: string;
    isRequired: boolean;
    minLength: number | null;
    maxLength: number | null;
    mustBePositive: boolean;
    mustBeValidUrl: boolean;
    mustBeBetween0And100: boolean;
}

export interface UpdateTemplateFieldRequest {
    stageNumber: number;
    fieldOrder: number;
    label: string;
    inputType: string;
    fieldOptions: string | null;
    rationale: string;
    isRequired: boolean;
    minLength: number | null;
    maxLength: number | null;
    mustBePositive: boolean;
    mustBeValidUrl: boolean;
    mustBeBetween0And100: boolean;
}

export async function listTemplates(token?: string): Promise<Template[]> {
    return apiRequest<Template[]>('GET', '/api/templates', undefined, token);
}

export async function getTemplateById(id: number, token?: string): Promise<Template> {
    return apiRequest<Template>('GET', `/api/templates/${id}`, undefined, token);
}

export async function createTemplate(template: CreateTemplateRequest, token?: string): Promise<Template> {
    return apiRequest<Template>('POST', '/api/templates', template, token);
}

export async function updateTemplate(id: number, template: UpdateTemplateRequest, token?: string): Promise<void> {
    await apiRequest<void>('PUT', `/api/templates/${id}`, template, token);
}

export async function deleteTemplate(id: number, token?: string): Promise<void> {
    await apiRequest<void>('DELETE', `/api/templates/${id}`, undefined, token);
}

export async function listTemplateFields(templateId: number, token?: string): Promise<TemplateField[]> {
    return apiRequest<TemplateField[]>('GET', `/api/templatefields/template/${templateId}`, undefined, token);
}

export async function createTemplateField(field: CreateTemplateFieldRequest, token?: string): Promise<TemplateField> {
    return apiRequest<TemplateField>('POST', '/api/templatefields', field, token);
}

export async function updateTemplateField(id: number, field: UpdateTemplateFieldRequest, token?: string): Promise<void> {
    await apiRequest<void>('PUT', `/api/templatefields/${id}`, field, token);
}

export async function deleteTemplateField(id: number, token?: string): Promise<void> {
    await apiRequest<void>('DELETE', `/api/templatefields/${id}`, undefined, token);
}

export async function reorderTemplateFields(fieldOrders: { id: number; order: number }[], token?: string): Promise<void> {
    await apiRequest<void>('PUT', '/api/templatefields/reorder', { fieldOrders }, token);
}

export async function listCategories(token?: string): Promise<string[]> {
    return apiRequest<string[]>('GET', '/api/developer/categories', undefined, token);
}
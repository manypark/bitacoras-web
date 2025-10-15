export interface ConceptEntity {
    idConcept   : number;
    description : string;
    active      : boolean;
}

export const CONCEPTS_KEYS: (keyof ConceptEntity)[] = ['idConcept', 'description', 'active'];
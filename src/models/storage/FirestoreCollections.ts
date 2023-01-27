import { AboutCollection } from './AboutCollection';
import { BioCollection } from './BioCollection';
import { EducationCollection } from './EducationCollection';
import { ExperineceCollection } from './ExperienceCollection';
import { MessagesCollection } from './MessagesCollection';
import { ProfficienciesCollection } from './ProfficienciesCollection';
import { SkillsCollection } from './SkillsCollection';

export type FirestoreCollections = {
    'experience': ExperineceCollection;
    'education': EducationCollection;
    'bio': BioCollection;
    'about': AboutCollection;
    'messages': MessagesCollection;
    'skills': SkillsCollection;
    'profficiencies': ProfficienciesCollection;
}

export type FirestoreCollectionNames = keyof FirestoreCollections;

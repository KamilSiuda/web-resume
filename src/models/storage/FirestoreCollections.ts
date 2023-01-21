import { AboutCollection } from './AboutCollection';
import { BioCollection } from './BioCollection';
import { EducationCollection } from './EducationCollection';
import { ExperineceCollection } from './ExperienceCollection';
import { MessagesCollection } from './MessagesCollection';

export type FirestoreCollections = {
    'experience': ExperineceCollection;
    'education': EducationCollection;
    'bio': BioCollection;
    'about': AboutCollection;
    'messages': MessagesCollection;
}

export type FirestoreCollectionNames = keyof FirestoreCollections;

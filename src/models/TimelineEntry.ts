import { Dayjs } from 'dayjs';

export type TimelineEntry = {
    from: Dayjs;
    to?: Dayjs;
    subtitle: string;
    title: string;
    description: string;
    tags?: Array<string>;
    avatar: string;
}

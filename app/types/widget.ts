export type WidgetType = 'clock' | 'quote' | 'weather' | 'crypto' | 'todo' | 'note' | 'news' | 'calendar' | 'spotify';

export interface WidgetData {
    id : string ;
    type : WidgetType ;
}
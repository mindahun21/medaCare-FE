export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  type: MessageType;
  text: string;
  duration?: number;
}

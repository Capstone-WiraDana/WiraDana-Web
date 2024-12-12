export type StoryPayload = {
  story_id: number;
  investor_id: number;
};

export type CommentPayload = {
  id: number;
  story_id: number;
  comment: string;
};

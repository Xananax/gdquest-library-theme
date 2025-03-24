import { NominalType } from '../deps.ts';

export type UserId = NominalType<"UserId", string>;
export type CourseId = NominalType<"CourseId", string>;
export type ProductId = NominalType<"ProductId", string>;
export type PostId = NominalType<"PostId", number>;
export type NotificationPostId = NominalType<"notification_post_id", number>;
export type NotificationContentId = NominalType<"notification_content_id", number>;

export const userId = (id: string) => id as UserId;
export const postId = (id: number) => id as PostId;
export const notificationPostId = (id: number) => id as NotificationPostId;

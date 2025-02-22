// as seen on https://www.10xtech.io/blogs/nominal-types
declare const __type: unique symbol;

export type Nominal<Identifier, Type> = Type & {
  readonly [__type]: Identifier;
};

export type UserId = Nominal<"UserId", string>;
export type CourseId = Nominal<"CourseId", string>;
export type ProductId = Nominal<"ProductId", string>;
export type PostId = Nominal<"PostId", number>;
export type NotificationPostId = Nominal<"notification_post_id", number>;
export type NotificationContentId = Nominal<"notification_content_id", number>;

export const userId = (id: string) => id as UserId;
export const postId = (id: number) => id as PostId;
export const notificationPostId = (id: number) => id as NotificationPostId;

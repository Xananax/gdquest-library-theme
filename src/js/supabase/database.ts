import { SetNonNullable, type MergeDeep } from "type-fest";

import { type Database as GeneratedDatabase, Json } from "./database-generated.ts";
import {
  PostId,
  NotificationPostId,
  NotificationContentId,
} from "../framework/nominalTypes.ts";

/** Shortcut to the Stripe address type */
export type Address = any;

export type Post = Omit<
  RemoveNullExcept<
    GeneratedDatabase["public"]["Views"]["posts_with_meta"]["Row"],
    "avatar_url" | "deleted_at" | "post_id" | "reply_to_id"
  >,
  "self_score"
> & { self_score: 0 | 1 | -1; post_id: PostId; reply_to_id: PostId };

/*
type RemoveNullOn<T, O extends keyof T = never> = {
  [P in keyof T]: P extends O ? Exclude<T[P], null> : T[P];
};
*/

type RemoveNullExcept<T, E extends keyof T = never> = {
  [P in keyof T]: P extends E ? T[P] : Exclude<T[P], null>;
};

export type PostForView = Omit<Post, "created_at"> & {
  children: PostForView[];
  created_at: Date;
  parents: PostForView[];
  replyTo: PostForView | null;
};

/** Augment and precise the types generated found in `./database-generated.ts` */
export type Database = MergeDeep<
  GeneratedDatabase,
  {
    public: {
      Tables: {
        purchases: {
          Row: {
            product_slug: string;
            address: Address;
          };
          Insert: {
            product_slug: string;
            address: Address;
            purchase_id?: never;
          };
          Update: {
            product_slug?: string;
            address?: Address;
            purchase_id?: never;
          };
        };
        notifications_content: {
          Row: {
            notification_content_id: NotificationContentId;
          };
        };
        notifications_posts: {
          Row: {
            notification_post_id: NotificationPostId;
            post_id?: PostId | null;
            thread_id: PostId;
            is_enabled: boolean;
          };
          Insert: {
            post_id?: PostId | null;
            thread_id: PostId;
          };
          Update: {
            post_id?: PostId | null;
            is_enabled?: boolean;
          };
        };
      };
      Views: {
        posts_with_meta: {
          Row: Post;
        };
        posts_slugs: {
          Row: {
            post_slug: string;
          };
        };
        user_profiles: {
          Row: {
            data: {
              continue_from_url?: Record<string, string>;
            } & Record<string, Json | undefined>;
            purchases: Array<{
              product_slug: string;
              created_at: Date;
              receipt_url: string;
              price_paid: number;
              refund_id: number;
              refund_amount: number;
            }> | null;
          };
        };
      };
      Functions: {
        add_purchase: {
          Args: {
            address: Address;
          };
        };
        get_available_discounts_for_product: {
          // TODO: why are those considered T | null?
          Returns: Array<
            SetNonNullable<
              GeneratedDatabase["public"]["Functions"]["get_available_discounts_for_product"]["Returns"][0]
            >
          >;
        };
        vote: {
          Args: {
            post_id: PostId;
            vote_value: 1 | 0 | -1;
          };
        };
        subscribe_to_thread: {
          Args: {
            thread_id: PostId;
            post_id?: PostId;
          };
        };
        create_thread: {
          Args: {
            title: string;
            post_slug: string;
            body_raw: string;
            post_tags?: string[];
            user_id?: string;
          };
          Returns: {
            post_id: PostId;
            reply_to_id: PostId | null;
          };
        };
        create_post: {
          Args: {
            reply_to_id: PostId;
          };
          Returns: {
            post_id: PostId;
            reply_to_id: PostId;
          };
        };
      };
    };
  }
>;

/** Extracts a table's schema from the database schema */
export type TableForSelect<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
/** Extracts a table's insert schema from the database schema */
export type TableForInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
/** Extracts an enum from the database schema */
export type Enum<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
/** Extracts a function from the database schema */
export type Procedure<T extends keyof Database["public"]["Functions"]> =
  Database["public"]["Functions"][T];

/** A user profile */
export type Profile = TableForSelect<"profiles">;
/** The minimal data necessary to insert a profile */
export type ProfileForInsert = Omit<TableForInsert<"profiles">, "created_at">;

/** A user's purchase */
export type Purchase = TableForSelect<"purchases">;
/** The minimal data for inserting a purchase */
export type PurchaseForInsert = Omit<
  TableForInsert<"purchases">,
  "purchase_id" | "created_at"
>;

export type PurchaseStripeProperties =
  | "address"
  | "customer_email"
  | "customer_name"
  | "note"
  | "payment_type"
  | "payment_id";

/** The part of a purchase that comes from a product. This should be found in the meta properties of the payment */
export type CheckoutMetadata = Omit<
  PurchaseForInsert,
  PurchaseStripeProperties | "discounts" | "accesses"
> & { discounts: string; digest: string };
/** The part of a purchase that comes from a payment on Stripe */
export type PurchaseStripePart = Pick<
  PurchaseForInsert,
  PurchaseStripeProperties
>;

/** A user's access */
export type Access = TableForSelect<"accesses">;
/** A user's access -- it should never be used, in theory (access gets created when a product is bought) */
export type AccessForInsert = TableForInsert<"accesses"> & never;

/** A Discount */
export type Discount = TableForSelect<"discounts">;

/** The enum that decides how a payment was made. */
export type PAYMENT_TYPE = Enum<"payment_type">;
/** The enum that decides what kind of product a product is */
export type PRODUCT_TYPE = Enum<"product_type">;

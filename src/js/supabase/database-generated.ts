export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accesses: {
        Row: {
          access_id: number
          created_at: string
          purchase_id: number | null
          slug: string
          user_id: string | null
        }
        Insert: {
          access_id?: never
          created_at?: string
          purchase_id?: number | null
          slug: string
          user_id?: string | null
        }
        Update: {
          access_id?: never
          created_at?: string
          purchase_id?: number | null
          slug?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accesses_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["purchase_id"]
          },
          {
            foreignKeyName: "accesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      claps: {
        Row: {
          count: number
          last_updated: string | null
          url: string
        }
        Insert: {
          count?: number
          last_updated?: string | null
          url: string
        }
        Update: {
          count?: number
          last_updated?: string | null
          url?: string
        }
        Relationships: []
      }
      discounts: {
        Row: {
          amount: number
          created_at: string
          date_end: string
          date_start: string | null
          discount_id: number
          discount_type: Database["public"]["Enums"]["discount_type"]
          max_uses: number
          products: string[]
          slug: string
          unlimited_uses: boolean
        }
        Insert: {
          amount?: number
          created_at?: string
          date_end: string
          date_start?: string | null
          discount_id?: never
          discount_type: Database["public"]["Enums"]["discount_type"]
          max_uses?: number
          products: string[]
          slug: string
          unlimited_uses?: boolean
        }
        Update: {
          amount?: number
          created_at?: string
          date_end?: string
          date_start?: string | null
          discount_id?: never
          discount_type?: Database["public"]["Enums"]["discount_type"]
          max_uses?: number
          products?: string[]
          slug?: string
          unlimited_uses?: boolean
        }
        Relationships: []
      }
      discounts_to_purchases: {
        Row: {
          discount_id: number
          discount_to_purchase_id: number
          purchase_id: number
        }
        Insert: {
          discount_id: number
          discount_to_purchase_id?: never
          purchase_id: number
        }
        Update: {
          discount_id?: number
          discount_to_purchase_id?: never
          purchase_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "discounts_to_purchases_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["discount_id"]
          },
          {
            foreignKeyName: "discounts_to_purchases_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "valid_discounts"
            referencedColumns: ["discount_id"]
          },
          {
            foreignKeyName: "discounts_to_purchases_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["purchase_id"]
          },
        ]
      }
      moderated_posts: {
        Row: {
          created_at: string
          is_hidden: boolean
          is_pinned: boolean
          moderator_id: string | null
          notes: string | null
          post_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          is_hidden?: boolean
          is_pinned?: boolean
          moderator_id?: string | null
          notes?: string | null
          post_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          is_hidden?: boolean
          is_pinned?: boolean
          moderator_id?: string | null
          notes?: string | null
          post_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderated_posts_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "moderated_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "moderated_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
        ]
      }
      notifications_content: {
        Row: {
          content_slug: string
          created_at: string | null
          is_enabled: boolean | null
          notification_content_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_slug: string
          created_at?: string | null
          is_enabled?: boolean | null
          notification_content_id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_slug?: string
          created_at?: string | null
          is_enabled?: boolean | null
          notification_content_id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications_posts: {
        Row: {
          created_at: string | null
          is_enabled: boolean | null
          is_read: boolean | null
          notification_post_id: number
          post_id: number | null
          thread_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          is_enabled?: boolean | null
          is_read?: boolean | null
          notification_post_id?: never
          post_id?: number | null
          thread_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          is_enabled?: boolean | null
          is_read?: boolean | null
          notification_post_id?: never
          post_id?: number | null
          thread_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts: {
        Row: {
          body_raw: string
          created_at: string
          deleted_at: string | null
          is_published: boolean
          post_id: number
          post_slug: string
          post_tags: number[] | null
          previous_versions: string[]
          reply_to_id: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body_raw?: string
          created_at?: string
          deleted_at?: string | null
          is_published?: boolean
          post_id?: never
          post_slug: string
          post_tags?: number[] | null
          previous_versions?: string[]
          reply_to_id?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body_raw?: string
          created_at?: string
          deleted_at?: string | null
          is_published?: boolean
          post_id?: never
          post_slug?: string
          post_tags?: number[] | null
          previous_versions?: string[]
          reply_to_id?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          data: Json
          email: string | null
          hide_info: boolean
          nickname: string
          stripe_customer: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          data?: Json
          email?: string | null
          hide_info?: boolean
          nickname?: string
          stripe_customer?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          data?: Json
          email?: string | null
          hide_info?: boolean
          nickname?: string
          stripe_customer?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      purchases: {
        Row: {
          accesses: string[]
          address: Json
          created_at: string
          current_price: number
          custom_data: Json | null
          customer_email: string
          customer_name: string
          discounts: string[]
          full_price: number
          note: string
          payment_id: string
          payment_type: Database["public"]["Enums"]["payment_type"]
          price_paid: number
          product_slug: string
          product_type: Database["public"]["Enums"]["product_type"]
          purchase_id: number
          receipt_url: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          accesses: string[]
          address?: Json
          created_at?: string
          current_price: number
          custom_data?: Json | null
          customer_email: string
          customer_name: string
          discounts: string[]
          full_price: number
          note?: string
          payment_id: string
          payment_type?: Database["public"]["Enums"]["payment_type"]
          price_paid: number
          product_slug: string
          product_type: Database["public"]["Enums"]["product_type"]
          purchase_id?: never
          receipt_url?: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          accesses?: string[]
          address?: Json
          created_at?: string
          current_price?: number
          custom_data?: Json | null
          customer_email?: string
          customer_name?: string
          discounts?: string[]
          full_price?: number
          note?: string
          payment_id?: string
          payment_type?: Database["public"]["Enums"]["payment_type"]
          price_paid?: number
          product_slug?: string
          product_type?: Database["public"]["Enums"]["product_type"]
          purchase_id?: never
          receipt_url?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      refunds: {
        Row: {
          created_at: string
          note: string
          purchase_id: number | null
          refund_amount: number
          refund_id: number
          stripe_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          note?: string
          purchase_id?: number | null
          refund_amount: number
          refund_id?: never
          stripe_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          note?: string
          purchase_id?: number | null
          refund_amount?: number
          refund_id?: never
          stripe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["purchase_id"]
          },
          {
            foreignKeyName: "refunds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tags: {
        Row: {
          tag_id: number
          tag_slug: string
        }
        Insert: {
          tag_id?: never
          tag_slug: string
        }
        Update: {
          tag_id?: never
          tag_slug?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          body_raw: string
          created_at: string
          flagged_reason: string | null
          name: string | null
          notes: string | null
          reason: string | null
          sent_at: string
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_id: number
          title: string | null
          user_email: string
          user_id: string | null
        }
        Insert: {
          body_raw?: string
          created_at?: string
          flagged_reason?: string | null
          name?: string | null
          notes?: string | null
          reason?: string | null
          sent_at: string
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_id?: never
          title?: string | null
          user_email: string
          user_id?: string | null
        }
        Update: {
          body_raw?: string
          created_at?: string
          flagged_reason?: string | null
          name?: string | null
          notes?: string | null
          reason?: string | null
          sent_at?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_id?: never
          title?: string | null
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tickets_responses: {
        Row: {
          body_raw: string
          created_at: string
          moderator_id: string | null
          notes: string | null
          response_id: number
          sent_at: string | null
          ticket_id: number
          user_id: string | null
        }
        Insert: {
          body_raw?: string
          created_at?: string
          moderator_id?: string | null
          notes?: string | null
          response_id?: never
          sent_at?: string | null
          ticket_id: number
          user_id?: string | null
        }
        Update: {
          body_raw?: string
          created_at?: string
          moderator_id?: string | null
          notes?: string | null
          response_id?: never
          sent_at?: string | null
          ticket_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_responses_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tickets_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "tickets_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      votes: {
        Row: {
          created_at: string
          post_id: number
          updated_at: string
          user_id: string
          vote_value: number
        }
        Insert: {
          created_at?: string
          post_id: number
          updated_at?: string
          user_id: string
          vote_value?: number
        }
        Update: {
          created_at?: string
          post_id?: number
          updated_at?: string
          user_id?: string
          vote_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      posts_slugs: {
        Row: {
          post_slug: string | null
        }
        Relationships: []
      }
      posts_with_meta: {
        Row: {
          avatar_url: string | null
          body_raw: string | null
          created_at: string | null
          deleted_at: string | null
          hide_info: boolean | null
          is_author: boolean | null
          is_deleted: boolean | null
          is_hidden: boolean | null
          is_pinned: boolean | null
          is_published: boolean | null
          nickname: string | null
          post_id: number | null
          post_slug: string | null
          post_tags: number[] | null
          previous_versions: string[] | null
          reply_to_id: number | null
          self_score: number | null
          tags_slugs: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          vote_score: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      thread_subscribers: {
        Row: {
          emails: string[] | null
          is_enabled: boolean | null
          thread_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "posts_with_meta"
            referencedColumns: ["post_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          accesses: string[] | null
          avatar_url: string | null
          data: Json | null
          email: string | null
          hide_info: boolean | null
          nickname: string | null
          purchases: Json | null
          stripe_customer: string | null
          user_id: string | null
        }
        Relationships: []
      }
      valid_discounts: {
        Row: {
          amount: number | null
          created_at: string | null
          date_end: string | null
          date_start: string | null
          discount_id: number | null
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          max_uses: number | null
          products: string[] | null
          slug: string | null
          unlimited_uses: boolean | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date_end?: string | null
          date_start?: string | null
          discount_id?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          max_uses?: number | null
          products?: string[] | null
          slug?: string | null
          unlimited_uses?: boolean | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date_end?: string | null
          date_start?: string | null
          discount_id?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          max_uses?: number | null
          products?: string[] | null
          slug?: string | null
          unlimited_uses?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_purchase: {
        Args: {
          user_id: string
          customer_email: string
          stripe_customer: string
          product_slug: string
          payment_id: string
          address: Json
          user_email: string
          customer_name: string
          product_type: Database["public"]["Enums"]["product_type"]
          full_price: number
          current_price: number
          price_paid: number
          accesses: string[]
          discounts?: string[]
          payment_type?: Database["public"]["Enums"]["payment_type"]
          created_at?: string
        }
        Returns: {
          accesses: string[]
          address: Json
          created_at: string
          current_price: number
          custom_data: Json | null
          customer_email: string
          customer_name: string
          discounts: string[]
          full_price: number
          note: string
          payment_id: string
          payment_type: Database["public"]["Enums"]["payment_type"]
          price_paid: number
          product_slug: string
          product_type: Database["public"]["Enums"]["product_type"]
          purchase_id: number
          receipt_url: string
          user_email: string
          user_id: string | null
        }[]
      }
      bulk_create_users: {
        Args: {
          emails: string[]
          metadata?: Json
        }
        Returns: Database["public"]["CompositeTypes"]["bulk_created_user"][]
      }
      continue_from_url: {
        Args: {
          course_url: string
          page_url: string
          user_id?: string
        }
        Returns: {
          avatar_url: string | null
          created_at: string
          data: Json
          email: string | null
          hide_info: boolean
          nickname: string
          stripe_customer: string | null
          updated_at: string
          user_id: string
        }[]
      }
      create_one_time_discount: {
        Args: {
          slug: string
          products: string[]
          amount: number
          date_end?: string
          date_start?: string
        }
        Returns: {
          amount: number
          created_at: string
          date_end: string
          date_start: string | null
          discount_id: number
          discount_type: Database["public"]["Enums"]["discount_type"]
          max_uses: number
          products: string[]
          slug: string
          unlimited_uses: boolean
        }[]
      }
      create_post: {
        Args: {
          body_raw: string
          reply_to_id: number
          user_id?: string
        }
        Returns: {
          body_raw: string
          created_at: string
          deleted_at: string | null
          is_published: boolean
          post_id: number
          post_slug: string
          post_tags: number[] | null
          previous_versions: string[]
          reply_to_id: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
      }
      create_refund: {
        Args: {
          refunded_purchase_id: number
          remove_access: boolean
          amount?: number
          note?: string
          stripe_id?: string
        }
        Returns: {
          created_at: string
          note: string
          purchase_id: number | null
          refund_amount: number
          refund_id: number
          stripe_id: string | null
          user_id: string | null
        }
      }
      create_secret_discount: {
        Args: {
          slug: string
          products: string[]
          amount: number
          date_end?: string
          date_start?: string
        }
        Returns: {
          amount: number
          created_at: string
          date_end: string
          date_start: string | null
          discount_id: number
          discount_type: Database["public"]["Enums"]["discount_type"]
          max_uses: number
          products: string[]
          slug: string
          unlimited_uses: boolean
        }[]
      }
      create_thread: {
        Args: {
          title: string
          post_slug: string
          body_raw: string
          post_tags?: string[]
          user_id?: string
        }
        Returns: {
          body_raw: string
          created_at: string
          deleted_at: string | null
          is_published: boolean
          post_id: number
          post_slug: string
          post_tags: number[] | null
          previous_versions: string[]
          reply_to_id: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
      }
      create_ticket: {
        Args: {
          user_email: string
          body_raw: string
          title?: string
          sent_at?: string
          name?: string
          user_id?: string
        }
        Returns: undefined
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      delete_post: {
        Args: {
          post_id: number
        }
        Returns: string
      }
      delete_user_data: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      elevate_to_claim_admin: {
        Args: {
          uid: string
        }
        Returns: string
      }
      get_available_discounts_for_product: {
        Args: {
          product_slug: string
        }
        Returns: {
          amount: number | null
          created_at: string | null
          date_end: string | null
          date_start: string | null
          discount_id: number | null
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          max_uses: number | null
          products: string[] | null
          slug: string | null
          unlimited_uses: boolean | null
        }[]
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_clap_count: {
        Args: {
          url_to_check: string
        }
        Returns: number
      }
      get_discount_uses: {
        Args: {
          incoming_discount_id: number
        }
        Returns: number
      }
      get_discounts: {
        Args: {
          discounts_slugs: string[]
        }
        Returns: {
          amount: number
          created_at: string
          date_end: string
          date_start: string | null
          discount_id: number
          discount_type: Database["public"]["Enums"]["discount_type"]
          max_uses: number
          products: string[]
          slug: string
          unlimited_uses: boolean
        }[]
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_data: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      hide_post: {
        Args: {
          post_id: number
          hide_value: boolean
          user_id?: string
        }
        Returns: string
      }
      increment_claps: {
        Args: {
          url_to_clap: string
          increment_by?: number
        }
        Returns: boolean
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_moderator: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_post_update_valid: {
        Args: {
          post_id: number
          reply_to_id: number
        }
        Returns: boolean
      }
      pin_post: {
        Args: {
          post_id: number
          pin_value: boolean
          user_id?: string
        }
        Returns: string
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      set_moderator: {
        Args: {
          uid: string
        }
        Returns: string
      }
      set_role: {
        Args: {
          uid: string
          role: string
        }
        Returns: string
      }
      subscribe_to_content: {
        Args: {
          content_slug: string
          user_id?: string
          is_enabled?: boolean
        }
        Returns: undefined
      }
      subscribe_to_thread: {
        Args: {
          thread_id: number
          user_id?: string
          is_enabled?: boolean
          post_id?: number
        }
        Returns: undefined
      }
      unlock_group_course: {
        Args: {
          group_name: string
          course_name: string
        }
        Returns: undefined
      }
      vote: {
        Args: {
          post_id: number
          vote_value?: number
          user_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      discount_type: "SECRET" | "SALE"
      payment_type: "STRIPE" | "SEE_NOTE" | "MAVENSEED"
      product_type: "PRODUCT" | "BUNDLE"
      ticket_status: "WAITING" | "PROCESSING" | "HALTED" | "ARCHIVED"
    }
    CompositeTypes: {
      bulk_created_user: {
        user_email: string | null
        user_password: string | null
        user_uuid: string | null
        existed: boolean | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never


// @ts-check
import { AuthError, createClient, PostgrestError } from "@supabase/supabase-js";
import { type Database } from "./database";
import { PostId } from "./nominal";

// @ts-ignore
const SUPABASE_URL = process.env.SUPABASE_URL || "";
// @ts-ignore
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

if (SUPABASE_URL === "" || SUPABASE_ANON_KEY === "") {
  console.error("SUPABASE_URL and SUPABASE_ANON_KEY are not set");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

interface GetSessionProps{
  onSessionChanged: (session: any) => void;
  onError: (error: any) => void;
}

export const getSession = ({ onSessionChanged, onError }:GetSessionProps) => {
  async function signInWithOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(data.session);
    }
    return { data, error };
  }

  async function signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(data.session);
    }
    return { data, error };
  }

  async function signUpWithEmail(email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      const error = new AuthError("Password and Confirm Password are not the same");
      error.status = 400;
      error.code = "password_mismatch" as const;
      onError(error);
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(data.session);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      onError(error);
    }
  }

  supabase.auth.getSession().then(({ data: { session: s }, error }) => {
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(s);
    }
  });

  supabase.auth.onAuthStateChange((_event, s) => {
    onSessionChanged(s);
  });

  return { signInWithOTP, logout, signUpWithEmail, signInWithPassword };
};

const handleSupabaseResponse = <T>({ error, data }:{error:PostgrestError, data: null} | {error:null, data: T}) => {
  if (error) {
    console.error(error);
    throw Error;
  }
  console.log(`supabase`, data);
  return data;
};

type Post =
  & Omit<Database["public"]["Views"]["posts_with_meta"]["Row"], "created_at">
  & {
    created_at: Date;
    children: Post[];
  };

const sortPosts = (a: Post, b: Post) =>
  (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0) ||
  b.vote_score - a.vote_score ||
  b.created_at.getTime() - a.created_at.getTime();

export const posts = () => {
  const getPostsListBySlug = (post_slug: string) =>
    supabase
      .from("posts_with_meta")
      .select("*")
      .eq("post_slug", post_slug)
      //.eq("is_hidden", false)
      .or("is_hidden.eq.false,is_hidden.is.null") // <-- only useful when not "coalesce"
      .order("is_pinned", { ascending: false })
      .order("vote_score", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ error, data: rows }) => {
        if (error) {
          throw error;
        }

        const temporaryRowsMapCache = new Map(
          rows.map(({ created_at, ...post }) => [
            post.post_id,
            {
              ...post,
              created_at: new Date(created_at),
              children: [] as Post[],
            },
          ]),
        );

        const threads: Post[] = [];

        temporaryRowsMapCache.forEach((row) => {
          if (!row.reply_to_id) {
            threads.push(row);
            return;
          }
          const parent = temporaryRowsMapCache.get(row.reply_to_id);
          if (parent) {
            parent.children.push(row);
          }
        });
        /**/
        temporaryRowsMapCache.forEach((row) => {
          row.children.sort(sortPosts);
        });
        threads.sort(sortPosts);
        /**/
        return threads;
      });

  const createThread = (
    args: Database["public"]["Functions"]["create_thread"]["Args"],
  ) => supabase.rpc("create_thread", { ...args }).then(handleSupabaseResponse);

  const votePost = (post_id: PostId, vote_value: 0 | 1 | -1) =>
    supabase.rpc("vote", { post_id, vote_value }).then(handleSupabaseResponse);

  const deletePost = (post_id: PostId) =>
    supabase.rpc("delete_post", { post_id }).then(handleSupabaseResponse);

  const createPost = (
    args: Database["public"]["Functions"]["create_post"]["Args"],
  ) => supabase.rpc("create_post", args).then(handleSupabaseResponse);

  const updatePost = (
    { body_raw, title, post_id }: {
      body_raw: string;
      title: string;
      post_id: PostId;
    },
  ) =>
    supabase
      .from("posts")
      .update({ body_raw, title })
      .eq("post_id", post_id)
      .select()
      .then(handleSupabaseResponse);

  const getAllPostsPages = () =>
    supabase
      .from("posts_slugs")
      .select("post_slug")
      .then(handleSupabaseResponse);

  const pinPost = (post_id: PostId, pin_value = true) =>
    supabase
      .rpc("pin_post", { post_id, pin_value })
      .then(handleSupabaseResponse);

  const hidePost = (post_id: PostId, hide_value = true) =>
    supabase
      .rpc("hide_post", { post_id, hide_value })
      .then(handleSupabaseResponse);

  return {
    getPostsListBySlug,
    createThread,
    votePost,
    deletePost,
    createPost,
    updatePost,
    getAllPostsPages,
    pinPost,
    hidePost,
  };
};

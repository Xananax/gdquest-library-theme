// @ts-check
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

if (SUPABASE_URL === "" || SUPABASE_ANON_KEY === "") {
  console.error("SUPABASE_URL and SUPABASE_ANON_KEY are not set");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getSession = ({ onSessionChanged, onError }) => {
  async function signInWithOTP(email) {
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

  async function signInWithPassword(email, password) {
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

  async function signUpWithEmail(email, password, passwordConfirm) {
    if (password !== passwordConfirm) {
      return { error: "Password and Confirm Password are not the same" };
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

const handleSupabaseResponse = ({ error, data }) => {
  if (error) {
    console.error(error);
    throw Error;
  }
  console.log(`supabase`, data);
  return data;
};

const sortPosts = (a, b) =>
  (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0) ||
  b.vote_score - a.vote_score ||
  b.created_at.getTime() - a.created_at.getTime();

export const posts = () => {

  const getPostsListBySlug = (post_slug) =>
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
        // no matter what I tried, recursive queries weren't fast enough in Postgres, so we stitch them here
        const temporaryRowsMapCache = new Map(
          rows.map(({ created_at, ...post }) => [
            post.post_id,
            {
              ...post,
              created_at: new Date(created_at),
              children: [],
            },
          ])
        );
        const threads = [];
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

  const createThread = (args) =>
    supabase.rpc("create_thread", { ...args }).then(handleSupabaseResponse);

  const votePost = (post_id, vote_value) =>
    supabase.rpc("vote", { post_id, vote_value }).then(handleSupabaseResponse);

  const deletePost = (post_id) =>
    supabase.rpc("delete_post", { post_id }).then(handleSupabaseResponse);

  const createPost = (args) =>
    supabase.rpc("create_post", { ...args }).then(handleSupabaseResponse);

  const updatePost = ({ body_raw, title, post_id }) => {
    return supabase
      .from("posts")
      .update({ body_raw, title })
      .eq("post_id", post_id)
      .select()
      .then(handleSupabaseResponse);
  };

  const getAllPostsPages = () =>
    supabase
      .from("posts_slugs")
      .select("post_slug")
      .then(handleSupabaseResponse);

  const pinPost = (post_id, pin_value = true) =>
    supabase
      .rpc("pin_post", { post_id, pin_value })
      .then(handleSupabaseResponse);

  const hidePost = (post_id, hide_value = true) =>
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

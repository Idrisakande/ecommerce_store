import redux from "@/redux/store";

export type RootState = ReturnType<typeof redux.store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof redux.store.dispatch;

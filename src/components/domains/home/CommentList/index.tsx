import { getComments, SortType } from "@/lib/apis/comments";
import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import styles from "./CommentList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  binId: number | string;
  isFill: boolean;
}

export default function CommentList({ binId, isFill }: Props) {
  const [sortType, setSortType] = useState<SortType>("LIKE_COUNT_DESC");
  const [fixCommentId, setFixCommentId] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data: commentsListData,
    refetch: refetchComments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", sortType],
    queryFn: ({ pageParam }) =>
      getComments(
        binId,
        sortType,
        pageParam.lastCommentId,
        pageParam.lastLikeCount
      ),
    initialPageParam: { lastCommentId: 0, lastLikeCount: 0 },
    getNextPageParam: (lastPage) => {
      const comments = lastPage?.commentDetails ?? [];
      if (comments.length === 0) return;
      const lastComment = comments[comments.length - 1];
      return {
        lastCommentId: lastComment.commentId,
        lastLikeCount: lastComment.likeCount,
      };
    },
  });

  const handleClickSortType = (listSortType: SortType) => {
    setSortType(listSortType);
  };

  const handleClickFixState = (id: number) => {
    setFixCommentId(id);
  };

  const bestLikeCount = commentsListData
    ? Math.max(
        0,
        ...commentsListData.pages.flatMap((page) =>
          Array.isArray(page?.commentDetails)
            ? page.commentDetails.map((comment: any) => comment.likeCount)
            : []
        )
      )
    : 0;

  const observeLastElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (loadMoreRef.current) {
      observeLastElement(loadMoreRef.current);
    }
  }, [observeLastElement]);

  return (
    <>
      <div className={cn("comment-title-feild")}>
        <h6 className={cn("comment-title")}>댓글</h6>
        <div>
          <button
            id="LIKE_COUNT_DESC"
            className={cn("comment-sort-btn", {
              selected: sortType === "LIKE_COUNT_DESC",
            })}
            onClick={() => handleClickSortType("LIKE_COUNT_DESC")}
          >
            추천순
          </button>
          <button
            id="CREATED_AT_DESC"
            className={cn("comment-sort-btn", {
              selected: sortType === "CREATED_AT_DESC",
            })}
            onClick={() => handleClickSortType("CREATED_AT_DESC")}
          >
            최신순
          </button>
        </div>
      </div>
      <ul className={cn("comments-list")}>
        {(!commentsListData ||
          commentsListData.pages.length === 0 ||
          commentsListData.pages.every(
            (page) =>
              !Array.isArray(page?.commentDetails) ||
              page.commentDetails.length === 0
          )) && <p className={cn("none-text")}>댓글이 없습니다.</p>}

        {commentsListData?.pages.map((page, pageIndex) =>
          Array.isArray(page?.commentDetails)
            ? page.commentDetails.map((comment: any) => (
                <Comment
                  key={comment.commentId ?? `${pageIndex}-${Math.random()}`}
                  commentData={comment}
                  refetchComments={refetchComments}
                  isBest={
                    comment.likeCount === bestLikeCount &&
                    comment.likeCount !== 0
                  }
                  onClickFixState={handleClickFixState}
                />
              ))
            : null
        )}
      </ul>
      <div ref={loadMoreRef} className={cn("loading-trigger")}>
        {isFetchingNextPage && <p>로딩 중...</p>}
      </div>
      {isFill && (
        <CommentForm
          binId={binId}
          fixCommentId={fixCommentId}
          refetchComments={refetchComments}
          onClearFixId={() => setFixCommentId(0)}
        />
      )}
    </>
  );
}

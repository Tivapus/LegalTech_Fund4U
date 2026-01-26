import type { Post } from "@/data/post";

export type FundraisingMonthlyPoint = {
  date: string;   // "YYYY-MM-01"
  amount: number; // cumulative total
};

export function cumulativeForPost(post: Post): FundraisingMonthlyPoint[] {
  const sorted = [...post.history].sort((a, b) => a.month.localeCompare(b.month));

  let running = 0;
  return sorted.map((h) => {
    running += h.amount;
    return { date: `${h.month}-01`, amount: running };
  });
}

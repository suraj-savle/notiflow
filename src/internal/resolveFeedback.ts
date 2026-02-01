import { FeedbackToast } from "../types/types";

export function resolveFeedback(toast: FeedbackToast) {
  return {
    title: toast.title ?? "Feedback",
    helperText:
      toast.helperText ?? "Your feedback helps us improve.",
    placeholder:
      toast.placeholder ?? "Share your thoughts...",
    submitText: toast.submitText ?? "Send",
  };
}

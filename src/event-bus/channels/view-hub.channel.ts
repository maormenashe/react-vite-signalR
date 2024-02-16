import { eventbus } from "../event-bus";

export const viewHubChannel = eventbus<{
  onViewCountUpdate: (viewCount: number) => void;
}>();

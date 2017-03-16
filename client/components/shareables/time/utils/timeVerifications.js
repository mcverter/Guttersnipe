export const shareableHasEvents = (item) => {
  return item && item.time && item.time.schedule
    && item.time.schedule.events
};


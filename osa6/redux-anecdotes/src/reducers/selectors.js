export const getSortedAnecdotes = (state) => {
    return [...state.anecdotes]
        .filter((a) => a.content.includes(state.filter))
        .sort((a, b) => b.votes - a.votes);
};

export const getNotification = (state) => state.notification;

export const getFilter = (state) => state.filter;
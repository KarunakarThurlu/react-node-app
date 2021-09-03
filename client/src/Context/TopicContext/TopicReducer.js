import TopicActions from "./TopicActions";

const TopicsReducer = (state, action) => {
    switch (action.type) {
        case TopicActions.SAVE_TOPIC:
            return {
                ...state,
                Topics: [...state.Topics, action.payload]
            }
        case TopicActions.UPDATE_TOPIC:
            return {
                ...state,
                Topics: state.Topics.map(topic => {
                    if (topic._id === action.payload.id) {
                        return action.payload;
                    }
                    return topic;
                })
            }
        case TopicActions.DELETE_TOPIC:
            return {
                ...state,
                Topics: state.Topics.filter(topic => topic._id !== action.payload)
            }
        case TopicActions.GET_TOPIC: {
            return {
                ...state,
                Topics:state.Topics.filter(topic => topic._id === action.payload)
            }
        }
        case TopicActions.GET_ALL_TOPICS: {
            return {
                ...state,
                Topics: action.payload
            }
        }
        default:
            return state;

    }
}

export default TopicsReducer;
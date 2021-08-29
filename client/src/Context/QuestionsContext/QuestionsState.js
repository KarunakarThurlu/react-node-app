import React, { useReducer } from 'react'
import QuestionsContext from "./QuestionsContext";
import QuestionReducer from './QuestionsReducer';
import QuestionApiCall from "../../ApiCalls/QuestionsApiCall";

import QuestionActions from "./QuestionActions";
import Notifier from '../../Utils/Notifier';


const QuestionsState = (props) => {
    const initialState = {
        questions: [],
    }
    const [state, dispatch] = useReducer(QuestionReducer, initialState);

    const saveQuestion = async (data) => {
        await QuestionApiCall.saveQuestion(data)
            .then(response => {
                if (response.data.statusCode === 200) {
                    Notifier.notify("Question Saved Successfully", Notifier.notificationType.SUCCESS);
                    dispatch({
                        type: QuestionActions.SAVE_QUESTION,
                        payload: response.data.data
                    });
                    return response.data.statusCode;
                }else{
                    Notifier.notify( response.data.message, Notifier.notificationType.ERROR);
                }
            }).catch(error => {

            })

    }

    const getQuestion = async (id) => {
        await QuestionApiCall.getQuestionById(id)
            .then(response => {
                if (response.data.statusCode === 200) {
                    Notifier.notify("Question Deleted Successfully", Notifier.notificationType.SUCCESS);
                    dispatch({
                        type: QuestionActions.GET_QUESTION,
                        payload: id
                    })
                } else {
                    Notifier.notify(response.data.message, Notifier.notificationType.SUCCESS);
                }
            })
            .catch(error => {

            });
    }
    const deleteQuestion = async (id) => {
        await QuestionApiCall.deleteQuestion(id)
            .then(response => {
                if (response.data.statusCode === 200) {
                    Notifier.notify(response.data.message, Notifier.notificationType.SUCCESS);
                    getAllQuestions();
                } else {
                    Notifier.notify(response.data.message, Notifier.notificationType.ERROR);
                }
            })
            .catch(error => {

            });
    }

    const getAllQuestions = async () => {
        await QuestionApiCall.getAllQuestions()
            .then(response => {
                dispatch({
                    type: QuestionActions.GET_ALL_QUESTIONS,
                    payload: response.data.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateQuestion = (data) => {
        dispatch({
            type: QuestionActions.UPDATE_QUESTION,
            payload: data
        })
    }

    return (
        <QuestionsContext.Provider value={{
            questions: state.questions,
            saveQuestion,
            getQuestion,
            deleteQuestion,
            getAllQuestions,
            updateQuestion
        }}>
            { props.children}
        </QuestionsContext.Provider >
    )
}

export default QuestionsState;

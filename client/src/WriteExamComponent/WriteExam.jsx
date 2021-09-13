import React, { useContext, useEffect, useState } from 'react'
import Home from '../HomeComponent/Home'
import UserContext from "../Context/UserContext/UserContext";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import WarningPopUpModel from "../Utils/WarningPopUpModel"
import TopicApiCall from "../ApiCalls/TopicApiCall";
import QuestionsApiCall from '../ApiCalls/QuestionsApiCall';

import "./writeexam.scss";
import SelectInput from '@material-ui/core/Select/SelectInput';
import MessageConstants from '../Utils/MessageConstants';
import ExamResults from './ExamResults';

function WriteExam(props) {
    const [value, setValue] = useState('');
    const [topics, setTopics] = useState([]);
    const [startExam, setStartExam] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [questions, setQuestions] = useState([]);
    const [questionInfo, setQuestionInfo] = useState({});
    let [seconds, setSeconds] = useState(0);
    let [minutes, setMinutes] = useState(20);
    const [openSubmitWarningModel, setOpenSubmitWarningModel] = useState(false);
    const [openExamResultsModel, setOpenExamResultsModel] = useState(false);
    const [testScore, setTestScore] = useState(0);

    useEffect(() => {
        TopicApiCall.getAllTopics()
            .then(response => setTopics(response.data.data))
            .catch(error => console.log(error));
    }, []);



    const handleChange = (event) => {
        setValue(event.target.value);
    };

    let handleClick = () => {
        if (topicName === '' || topicName === 'Please Select Topic') {
            let error = topicName === 'Please Select Topic' ? topicName : '';
            setTopicName(error)
        } else {
            QuestionsApiCall.getAllQuestionsByTopicId(topicName)
                .then(response => {
                    let array = [];
                    if (response.data.statusCode === 200) {
                        response.data.data.map((e, i) => {
                            e["answer"] = '';
                            e["id"] = i + 1;
                            array.push(e);
                        });
                        setQuestions(array);
                        setQuestionInfo(array[0]);
                        setCurrentQuestion(1);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            setStartExam(true);
            const down = () => {
                if (seconds === 0) {
                    seconds = 60;
                    setSeconds(seconds);
                    minutes = minutes - 1
                    setMinutes(minutes)
                } else {
                    seconds = seconds - 1
                    setSeconds(seconds);
                }
                if (minutes <= 0 && seconds === 0) {
                    clearInterval(fooo);
                }
            }
            let fooo = setInterval(down, 1000);
        }
    }
    const saveAnswer = (e) => {
        const updateAnswer = questions.find(Q => Q.id === questionInfo.id)
        if (updateAnswer) {
            updateAnswer.answer = e.target.value;
        }
    }
    const handleNextButtons = (value) => {
        if (value === "PreviousQuestion") {
            const back = currentQuestion === 1 ? 1 : currentQuestion - 1;
            setCurrentQuestion(back);
            const updateAnswer = questions.find(Q => Q.id === back);
            setQuestionInfo(updateAnswer);
        }
        if (value === "NextQuestion") {
            const forward = currentQuestion === questions.length ? questions.length : currentQuestion + 1;
            setCurrentQuestion(forward);
            const updateAnswer = questions.find(Q => Q.id === forward);
            setQuestionInfo(updateAnswer);
        }
    }

    const showWarning = (e) => {
        e.preventDefault();
        setOpenSubmitWarningModel(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        QuestionsApiCall.getTestResults(questions,0,topicName)
        .then(response => {
            if (response.data.statusCode === 200) {
                setTestScore(response.data.testScore);
                setOpenExamResultsModel(true);
                setStartExam(false);
                setTopicName('')
                setOpenSubmitWarningModel(false)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className="write-exam-container">
            <Home />
            <WarningPopUpModel open={openSubmitWarningModel} message={MessageConstants.Submit_Exam_Warning} onClickYes={handleSubmit} handleClose={() => setOpenSubmitWarningModel(false)} />
            <ExamResults open={openExamResultsModel} handleClose={() => setOpenExamResultsModel(false)}  testScore={testScore}/>
            {startExam === true ? <Grid container >
                <Grid item xs={8} sm={8}>
                    <FormControl >
                        <FormLabel >{questionInfo.id}.{questionInfo.name}</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="A" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "A" ? true : false} />} label={questionInfo.optionA} />
                            <FormControlLabel value="B" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "B" ? true : false} />} label={questionInfo.optionB} />
                            <FormControlLabel value="C" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "C" ? true : false} />} label={questionInfo.optionC} />
                            <FormControlLabel value="D" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "D" ? true : false} />} label={questionInfo.optionD} />
                        </RadioGroup>
                        <div className="next-buttons">
                            <Button variant="contained" color="primary" onClick={e => handleNextButtons("PreviousQuestion")}><SkipPreviousRoundedIcon style={{ color: "white" }} /></Button><Button variant="contained" color="primary" onClick={(e) => handleNextButtons("NextQuestion")}><SkipNextRoundedIcon style={{ color: "white" }} /></Button>
                        </div>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={3}>
                    Timer   {minutes} : {seconds}
                    <Grid className="questions-list" container justify="center" spacing={1}>
                        {questions.map((value, i) => (
                            <Grid variant="contained" key={value.id} item style={{ backgroundColor: value.answer !== "" ? "green" : "yellow" }} onClick={(e) => { setCurrentQuestion(value.id); setQuestionInfo(value); }} >
                                {value.id}
                            </Grid>
                        ))}
                        <div className="submit-button">
                            <Button variant="contained" onClick={showWarning}>Submit</Button>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
                :
                <Grid container spacing={1} className="start-exam">
                    <Grid item xs={8} sm={8}>
                        <Typography color='primary' variant='h6' component='h6' align='center' >
                            The Exam Contains 20 Questions and Time also 20 minutes means each
                            Question has exactly one minute. Before starting the exam you need to select topic
                            then you can click on start.
                        </Typography>
                        <br /><br /><br />
                        <FormControl variant="outlined" >
                            <InputLabel >Select Topic</InputLabel>
                            <Select
                                native
                                label="Select Topic"
                                name="Topic"
                                onClick={(e) => setTopicName(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                {topics.map(t => (<option value={t._id}>{t.topicName}</option>))}
                            </Select>
                        </FormControl>

                        <br /><br /><br />
                        <Button variant="contained" color='primary' onClick={handleClick}>Start</Button>

                    </Grid>
                </Grid>

            }
        </div >
    );
}

export default WriteExam

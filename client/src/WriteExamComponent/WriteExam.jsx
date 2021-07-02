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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import StartExam from "./StartExam";
import TopicApiCall from "../ApiCalls/TopicApiCall";
import QuestionsApiCall from '../ApiCalls/QuestionsApiCall';

import "./writeexam.scss";
import SelectInput from '@material-ui/core/Select/SelectInput';

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
                if (minutes <= 0) {
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

    return (
        <div className="write-exam-container">
            <Home />
            {startExam === true ? <Grid container >
                <Grid item xs={8} sm={8}>
                    <FormControl >
                        <FormLabel >{questionInfo.id}.{questionInfo.name}</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="optionA" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "optionA" ? true : false} />} label={questionInfo.optionA} />
                            <FormControlLabel value="optionB" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "optionB" ? true : false} />} label={questionInfo.optionB} />
                            <FormControlLabel value="optionC" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "optionC" ? true : false} />} label={questionInfo.optionC} />
                            <FormControlLabel value="optionD" onClick={e => saveAnswer(e)} control={<Radio checked={questionInfo.answer === "optionD" ? true : false} />} label={questionInfo.optionD} />
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
                            <Button variant="contained" >Submit</Button>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
                :
                <Grid container spacing={1} className="start-exam">
                    <Grid item xs={8} sm={8}>
                        <h4>
                            The Exam Contains 20 Questions and Time also 20 minutes means each
                            Question has exactly one minute. Before starting the exam you need to select topic
                            then you can click on start.</h4>

                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-age-native-simple">Select Topic</InputLabel>
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
                        {topicName}
                        <br /><br /><br />
                        <Button variant="contained" onClick={handleClick}>Start</Button>

                    </Grid>
                </Grid>

            }
        </div >
    );
}

export default WriteExam

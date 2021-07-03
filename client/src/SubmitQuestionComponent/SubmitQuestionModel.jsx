import React, { useContext, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import QuestionsContext from '../Context/QuestionsContext/QuestionsContext';
import { useForm } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TopicApiCall from "../ApiCalls/TopicApiCall";


function SubmitQuestionModel(props) {
    console.log(props.CQData);
    const [topics, setTopics] = useState([]);
    const { saveQuestion } = useContext(QuestionsContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        const response = saveQuestion(data);
        console.log(response);
        reset();
    }

    useEffect(() => {
        TopicApiCall.getAllTopics()
            .then(response => setTopics(response.data.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="Question-Model">
            <Dialog className="MuiDialog-paper-AddQuestionModel"
                open={props.open}
                onClose={props.onClose}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="question-form">
                    <TextField className="MuiTextField-root-login-submitquestion"
                        variant="outlined"
                        multiline rows={3} type="area"
                        aria-label="Question Name"
                        placeholder="Enter Question Name here"
                        value={props.CQData !== undefined ? props.CQData.name : ""}
                        name="name"
                        {...register("name", { required: "Question name is required" })}
                    /><br />
                    {errors.name && <span className="Error-Message">{errors.name.message}</span>}
                    <br />
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Topic</InputLabel>
                        <Select

                            native
                            label="topic"
                            name="topic"
                            {...register("topic", { required: " Select Topic Type" })}
                        >
                            <option aria-label="None" value="" />
                            {topics.map(t => (<option value={t._id}>{t.topicName}</option>))}
                        </Select>
                    </FormControl>
                    <br />
                    {errors.topic && <span className="Error-Message">{errors.topic.message}</span>}
                    <br />
                    <TextField className="MuiTextField-root"
                        variant="outlined"
                        label="Option A"
                        name="optionA"
                        {...register("optionA", { required: "OptionA is required" })}
                    /><br />
                    {errors.optionA && <span className="Error-Message">{errors.optionA.message}</span>}
                    <br />
                    <TextField className="MuiTextField-root"
                        variant="outlined"
                        label="Option B"
                        name="optionB"
                        {...register("optionB", { required: "OptionB is required" })}
                    /><br />
                    {errors.optionB && <span className="Error-Message">{errors.optionB.message}</span>}
                    <br />
                    <TextField className="MuiTextField-root"
                        variant="outlined"
                        label="Option C"
                        name="optionC"
                        {...register("optionC", { required: "OptionC is required" })}
                    /><br />
                    {errors.optionC && <span className="Error-Message">{errors.optionC.message}</span>}
                    <br />
                    <TextField className="MuiTextField-root"
                        variant="outlined"
                        label="Option D"
                        name="optionD"
                        {...register("optionD", { required: "OptionD is required" })}
                    /><br />
                    {errors.optionD && <span className="Error-Message">{errors.optionD.message}</span>}
                    <br />
                    <TextField className="MuiTextField-root"
                        variant="outlined"
                        label="Answer"
                        name="answer"
                        {...register("answer", { required: "Answer option is required" })}
                    /><br />
                    {errors.answer && <span className="Error-Message">{errors.answer.message}</span>}
                    <br />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button onClick={() => props.onClose()} variant="contained" style={{ backgroundColor: "red", color: "white" }}>Cancel</Button>
                </form>
            </Dialog>
        </div>
    )
}

export default SubmitQuestionModel

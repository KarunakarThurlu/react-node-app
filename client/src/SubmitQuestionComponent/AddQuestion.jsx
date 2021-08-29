import React, { useContext, useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Home from "../HomeComponent/Home";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import QuestionsContext from '../Context/QuestionsContext/QuestionsContext';
import TopicApiCall from "../ApiCalls/TopicApiCall";

const AddQuestion = () => {

    const [isValid, setIsValid] = useState(false);
    const [topics, setTopics] = useState([]);
    const { saveQuestion } = useContext(QuestionsContext);
    useEffect(() => {
        TopicApiCall.getAllTopics()
            .then(response => setTopics(response.data.data))
            .catch(error => console.log(error));
    }, []);
    const [data, setData] = useState({
        namee: "",
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        topic: '',
        answer: '',
    });

    const [errors, setErrors] = useState({
        namee: "",
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        topic: '',
        answer: '',
    });

    
    const validate = (name, value) => {
        switch (name) {
            case 'namee':
                if (value === "") {
                    setErrors({ ...errors, namee: 'Question is required' });
                } else {
                    if (value.length < 10) {
                        setErrors({ ...errors, namee: 'Question should be atleast 10 characters' });
                    } else if (value.length > 150) {
                        setErrors({ ...errors, namee: 'Question should be less than 100 characters' });
                    } else {
                        setErrors({ ...errors, namee: "" });
                    }
                }
                break;
            case 'optionA':
                if (value === '') {
                    setErrors({ ...errors, optionA: 'Option A is required' });
                } else {
                    if (value.length > 40) {
                        setErrors({ ...errors, optionA: 'Option A should be less than 40 characters' });
                    } else {
                        setErrors({ ...errors, optionA: '' });
                    }
                }
                break;
            case 'optionB':
                if (value === '') {
                    setErrors({ ...errors, optionB: 'Option B is required' });
                } else {
                    if (value.length > 40) {
                        setErrors({ ...errors, optionB: 'Option B should be less than 40 characters' });
                    } else {
                        setErrors({ ...errors, optionB: '' });
                    }
                }
                break;
            case 'optionC':
                if (value === '') {
                    setErrors({ ...errors, optionC: 'Option C is required' });
                } else {
                    if (value.length > 40) {
                        setErrors({ ...errors, optionC: 'Option C should be less than 40 characters' });
                    } else {
                        setErrors({ ...errors, optionC: '' });
                    }
                }
                break;
            case 'optionD':
                if (value === '') {
                    setErrors({ ...errors, optionD: 'Option D is required' });
                } else {
                     if (value.length > 40) {
                        setErrors({ ...errors, optionD: 'Option D should be less than 40 characters' });
                    } else {
                        setErrors({ ...errors, optionD: '' });
                    }
                }
                break;
            case 'answer':
                if (value === '') {
                    setErrors({ ...errors, answer: 'Answer is required' });
                } else {
                    if (value.length > 1) {
                        setErrors({ ...errors, answer: 'Answer should be Only one Character.' });
                    } else if (value.toUpperCase() === "A" || value.toUpperCase() === "B" || value.toUpperCase() === "C" || value.toUpperCase() === "D") {
                        setErrors({ ...errors, answer: '' });
                    } else {
                        setErrors({ ...errors, answer: 'Answer should be one of (A or B or C or D)' });
                    }
                }
                break;
            case 'topic':
                if (value === '') {
                    setErrors({ ...errors, topic: 'Topic is required' });
                } else {
                    setErrors({ ...errors, topic: '' });
                }
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(data);
            saveQuestion(data);
        } else {
            console.log(data);
            console.log('error');
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        validate(e.target.name, e.target.value);
    }

    const validateForm = () => {
        let isValid = true;
        Object.values(errors).forEach(val => {
            val.length>0 && (isValid = false);
        });
        setIsValid(isValid);
        return isValid;
    }

    return (
        <div className="addquestion">
            <Home />
            <div className="addQuestionForm">
                <h2>Add Question</h2>
                    <TextField
                        error={data.namee === "" && isValid ? true : false}
                        helperText={errors.namee}
                        className="questionName"
                        id="outlined-basic"
                        variant="outlined"
                        label="Question Name"
                        type="text"
                        name="namee"
                        onChange={handleChange}
                    />
                    <FormControl variant="outlined" className='topic'>
                        <InputLabel htmlFor="outlined-age-native-simple">Topic</InputLabel>
                        <Select
                            native
                            error={data.topic === '' && isValid ? true : false}
                            helperText={errors.topic}
                            onChange={handleChange}
                            label="Topic"
                            name='topic'
                           
                        >
                             <option aria-label="None" value='' />
                            {topics.map(t => (<option value={t._id}>{t.topicName}</option>))}
                        </Select>
                    </FormControl>
                <TextField
                    error={data.optionA === '' && isValid ? true : false}
                    helperText={errors.optionA}
                    className="options"
                    id="outlined-basic"
                    variant="outlined"
                    label="OptionA"
                    type="text"
                    name="optionA"
                    onChange={handleChange}

                />

                <TextField
                    error={data.optionB === '' && isValid ? true : false}
                    helperText={errors.optionB}
                    className="options"
                    id="outlined-basic"
                    variant="outlined"
                    label="OptionB"
                    type="text"
                    name="optionB"
                    onChange={handleChange}

                />

                <TextField
                    error={data.optionC === '' && isValid ? true : false}
                    helperText={errors.optionC}
                    className="options"
                    id="outlined-basic"
                    variant="outlined"
                    label="OptionC"
                    type="text"
                    name="optionC"
                    onChange={handleChange}

                />

                <TextField
                    error={data.optionD === '' && isValid ? true : false}
                    helperText={errors.optionD}
                    className="options"
                    id="outlined-basic"
                    variant="outlined"
                    label="OptionD"
                    type="text"
                    name="optionD"
                    onChange={handleChange}

                />

                <TextField
                    error={data.answer === '' && isValid ? true : false}
                    helperText={errors.answer}
                    id="outlined-basic"
                    variant="outlined"
                    label="Answer"
                    type="text"
                    name="answer"
                    onChange={handleChange}
                />

                <div className="submit">
                    <Button type="submit" onClick={handleSubmit} className="MuiButton-containedPrimary" variant="contained" color="primary">Submit</Button>
                </div>

            </div>
        </div>
    );
}

export default AddQuestion
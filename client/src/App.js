import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../src/HomeComponent/Home";
import Login from "../src/LoginComponent/Login";
import LandingPage from "./LandingComponent/LandingComponent";
import Register from "../src/RegisterComponent/Register";
import QuestionsTable from "./SubmitQuestionComponent/QuestionsTable";
import PageNotFoud from "./Utils/Custom404Page";
import AddQuestion from "./SubmitQuestionComponent/AddQuestion";
import PublicRoute from "./Router/PublicRoute";
import PrivateRoute from "./Router/PrivateRoute";
import DashBoard from './DashboardComponent/DashBoard';
import WriteExam from './WriteExamComponent/WriteExam';
import UserState from "./Context/UserContext/UserState";
import QuestionState from "./Context/QuestionsContext/QuestionsState";
import ManageUsers from './ManageUsers/ManageUsers';
import StartExam from './WriteExamComponent/StartExam';
import TopicTable from './TopicComponent/TopicTable';
import TopicState from "./Context/TopicContext/TopicState";

function App() {
  return (
    <BrowserRouter>
      <UserState>
        <QuestionState>
          <TopicState>
          <Switch>
            <PublicRoute restricted={false} component={LandingPage} exact path="/" />
            <PublicRoute restricted={true} component={Login} exact path="/signin" />
            <PublicRoute restricted={true} component={Register} exact path="/signup" />
            <PrivateRoute component={Home} exact path="/home" />
            <PrivateRoute component={DashBoard} exact path="/dashboard" />
            <PrivateRoute component={WriteExam} exact path="/writeexam" />
            <PrivateRoute component={QuestionsTable} exact path="/submitquestion" />
            <PrivateRoute component={ManageUsers} exact path="/manageusers" />
            <PrivateRoute component={AddQuestion} exact path="/addquestion" />
            <PrivateRoute component={TopicTable} exact path="/topic" />
            <PrivateRoute component={StartExam} exact path="/startexam" />
            <Route component={PageNotFoud} />
          </Switch>
          </TopicState>
        </QuestionState>
      </UserState>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
        }}
      />
    </BrowserRouter>
  );
}

export default App;

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import "../User/SignIn/UserSignIn.css";
import React, { useState } from "react";
import CustomSnackBar from "../snackbar";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  "& > *": {
    margin: theme.spacing(1),
    width: 100,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function VendorForgotPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const [diagStatus, setDiagStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const handleOpen = () => {
    setDiagStatus(true);
  };
  React.useEffect(() => {
		props.getCartCount()
	  })

  const handleClose = () => {
    setDiagStatus(false);
  };
  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const SendEmail = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    const obj = {
      email: email.value,
      password: `${Math.floor(10000 + Math.random() * 900000)}`,
    };

    postData("http://localhost:3000/api/auth/VendorForgetPassword", obj).then(
      (response) => {
        if (response.status === 200) {
          setDiagStatus(true);
          setMsg(`${response.message}`);
         
        } else {
          console.log(response.Error);
          setDiagStatus(true);
          setMsg(`${response.Error}`);
          // setAuth(false)
        }
        // return response;
      }
    );
  };
  const renderDialog = () => {
    return <CustomSnackBar message={msg} handleClose={handleClose} open={handleOpen} />;
  };
  return (
    <>
    <Header {...props} />
    <div className={classes.root} style={{paddingTop:"20px",paddingBottom:"20px"}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={10} sm={4}>
          <div className="headerLogo">
            <h3> Logo here </h3>
            <h3> Welcome</h3>
          </div>
          <Paper className={classes.paper}>
            <span>Will Send Your New password On Your Email</span>
            <form onSubmit={SendEmail} className={classes.root}>
              <TextField
                id="email"
								name="email"
								className="fullWidth"
								label="Email Address"
								variant="outlined"
								required="true"
              />
              <Button
                variant="contained"
                // onClick={SendEmail}
                className="fullWidth"
                color="primary"
                type="submit"
              >
                Send Email
              </Button>
            </form>
            <div className="have-account">
          <p>
            GoTo SignIn..
            <a href="/VendorSignIn">Sign-in</a>
          </p>
        </div>
          </Paper>
        </Grid>
      </Grid>
      {diagStatus ? renderDialog() : null}
    </div>
    <Footer/>
    </>
  );
}

export default VendorForgotPassword;

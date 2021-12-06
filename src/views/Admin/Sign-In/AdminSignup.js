import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import "./AdminSignup.css";
import React from "react";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/Header/header";

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

function AdminSignup(props) {
  const classes = useStyles();
  React.useEffect(() => {
    props.getCartCount()
  })
  // const history = useHistory();
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
  const SignUp = (event) => {
    console.log("aaaaaaaaa", event.target);
    // history.push('/');
    event.preventDefault();
    const { name, email, password, confirmPassword } = event.target.elements;

    const obj = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    postData("http://localhost:3000/api/auth/AdminSignup", obj).then(
      (response) => {
        console.log("response", response);
        // return response;
      }
    );
  };

  return (
    <>
    <Header {...props} />
    <div className={classes.root} style={{paddingTop:"20px",paddingBottom:"20px"}}>
      <form onSubmit={SignUp} className={classes.root}>
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
              <h3> Welcome Admin </h3>
            </div>
            <Paper className={classes.paper}>
              <h3>Sign up to OnliteShop.pk</h3>
              <TextField
                className="fullWidth"
                id="name"
                name="name"
                label="Username"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                required="true"
              />

              <TextField
                id="outlined-basic"
                name="email"
                className="fullWidth"
                label="Email Address"
                variant="outlined"
                required="true"
              />

              <TextField
                className="fullWidth"
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                required="true"
              />

              <TextField
                className="fullWidth"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                required="true"
              />

              <Button
                variant="contained"
                className="fullWidth"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="have-account">
                <p>
                  Have an account on Github?
                  <a href="/Sign-in">Sign-in</a>
                </p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default AdminSignup;

import React /*{ useState }*/ from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { IconButton } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";


function SlideTransition(transitionProps) {
	return <Slide {...transitionProps} direction="up" style={{ backgroundColor: transitionProps.isError ? "red" : "green" }} />;
}
function CustomSnackBar(props) {
	// const [isError,setError]=useState(props.isError)
	//if (props.isError === undefined || props.isError === null) props.isError = false;
	return (
		
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			TransitionComponent={(allProps) => SlideTransition({ ...allProps, isError: props.isError })}
			open={props.open}
			message={props.message}
			action={
				<React.Fragment>
					<IconButton size="small" aria-label="close" style={{ color: "#fff" }} onClick={props.handleClose}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</React.Fragment>
			}
		/>
	);
}

export default CustomSnackBar;

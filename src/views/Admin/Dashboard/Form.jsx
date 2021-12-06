import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const VendorRegForm = () => {
	async function postData(url, data) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('token')}`

			},
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	const Register = (event) => {
		event.preventDefault();
		const {
			storeName,
			storeType,
			storeLocation,
			email,
			password,
			confirmPassword,
			mobile,
			// address,
			city,
			// province,
			country,
			cnicNo,
			// cnicName,
			bankName,
			branchCode,
			accountTitle,
			accountNo
		} = event.target.elements;
		const obj = {
			storeName: storeName.value,
			storeType: storeType.value,
			storeLocation: storeLocation.value,
			email: email.value,
			password: password.value,
			confirmPassword: confirmPassword.value,
			mobile: mobile.value,
			// address: address.value,
			city: city.value,
			// province: province.value,
			country: country.value,
			cnicNo: cnicNo.value,
			// cnicName: cnicName.value,
			bankName: bankName.value,
			branchCode: branchCode.value,
			accountTitle: accountTitle.value,
			accountNo: accountNo.value
		};

		postData('http://localhost:3000/api/auth//AdminSignin', obj).then((response) => {
			console.log(response);
		});
	};

	return (
		<div style={{ padding: '5px' }}>
			<form onSubmit={Register}>
				<div className="headerLogo">
					<h1> Register A Vendor </h1>
				</div>

				{/* <p className="h4 text-center mb-4">Register</p> */}
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<TextField
							id="storeName"
							name="storeName"
							className="fullWidth"
							label="StoreName"
							variant="outlined"
						/>

						<TextField
							id="email"
							name="email"
							className="fullWidth"
							label="Email Address"
							variant="outlined"
						/>
						<TextField
							id="storeLocation"
							name="storeLocation"
							className="fullWidth"
							label="Store Address"
							variant="outlined"
						/>

						<TextField id="city" name="city" className="fullWidth" label="City" variant="outlined" />
						<TextField
							id="bankName"
							name="bankName"
							className="fullWidth"
							label="Bank Name"
							variant="outlined"
						/>

						<TextField
							id="accountTitle"
							name="accountTitle"
							className="fullWidth"
							label="Account Title"
							variant="outlined"
						/>

						<TextField
							className="fullWidth"
							id="password"
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
							variant="outlined"
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							id="storeType"
							name="storeType"
							className="fullWidth"
							label="StoreType"
							variant="outlined"
						/>
						<TextField id="cnicNo" className="fullWidth" name="cnicNo" label="Cnic No" variant="outlined" />

						<TextField
							id="mobile"
							className="fullWidth"
							name="mobile"
							label="Contact no"
							variant="outlined"
						/>

						<TextField
							id="country"
							className="fullWidth"
							name="country"
							label="Country"
							variant="outlined"
						/>
						<TextField
							id="branchCode"
							className="fullWidth"
							name="branchCode"
							label="Branch Code"
							variant="outlined"
						/>

						<TextField
							id="accountNo"
							className="fullWidth"
							name="accountNo"
							label="AccountNo"
							variant="outlined"
						/>
						<TextField
							className="fullWidth"
							id="confirmPassword"
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							autoComplete="current-password"
							variant="outlined"
						/>
					</Grid>
					<Button variant="contained" className="fullWidth" color="primary" type="submit">
						Register
					</Button>
				</Grid>
			</form>
		</div>
	);
};

export default VendorRegForm;

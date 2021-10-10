import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import OperatorContainer from "./OperatorContainer";
import { Box, Select, MenuItem, InputLabel, TextField, Button, Typography, Modal, Alert } from '@mui/material';


export default function OperatorForm() {
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const warehouseOptions = [
  	{value: "a", label: "A"},
  	{value: "b", label: "B"},
  	{value: "c", label: "C"},
  	{value: "d", label: "D"},
  	{value: "e", label: "E"},
  	{value: "f", label: "F"}
  ];

	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		console.log(data);

		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(data)
    };

    fetch('/api/requests', requestOptions)
    	.then(response => {
    		const replyData = response.json();

    		if (!response.ok) {
    			setSuccess(false);
    			setMessage("Something went wrong");
    		} else {
    			setSuccess(true);
    			setMessage("Request submitted successfully");
    		}
    	})
    handleOpen();
	}

	return (
		<OperatorContainer title={"Add A Delivery Order"}>
			<Box sx={{ margin: "4rem", width: "100%" }}>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', justifyContent: "flex-start", width: "100%" }}>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>CfsAdmin</InputLabel>
							<TextField sx={{ minWidth: 1/3 }} value="Central Admin" disabled variant="outlined" {...register("cfsAdmin")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Operator</InputLabel>
							<TextField sx={{ minWidth: 1/3 }} value="A" disabled variant="outlined" {...register("operator")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Cargo Size </InputLabel>
							<TextField sx={{ minWidth: 1/3 }} label="In pallets" variant="outlined" {...register("load")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Origin Warehouse</InputLabel>
							<Select defaultValue="" label="Select a Warehouse" sx={{ minWidth: 1/3 }} variant="outlined" {...register("origin")} >
								{warehouseOptions.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
							</Select>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Destination Warehouse</InputLabel>
							<Select defaultValue="" label="Select a Warehouse" sx={{ minWidth: 1/3 }} variant="outlined" {...register("destination")}>
								{warehouseOptions.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
							</Select>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Delivery Time</InputLabel>
							<TextField sx={{ minWidth: 1/3 }} type="time" variant="outlined" {...register("startTime")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Closing Time</InputLabel>
							<TextField sx={{ minWidth: 1/3 }} type="time" variant="outlined" {...register("endTime")} />
						</Box>
						<Button sx={{ marginTop: "1rem", backgroundColor: "#F3722C", color: "white"  }} type="submit">{"Confirm"}</Button>
						<Modal
						open={open}
						onClose={handleClose}
						>
							<Alert severity={success ? "success" : "error"}>{message}</Alert>
						</Modal>
					</Box>
				</form>
	
			</Box>
		</OperatorContainer>
	);
}
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import Datetime from 'react-datetime';
import OperatorContainer from "./OperatorContainer";
import { Box, Select, MenuItem, InputLabel, TextField, Button, Typography, Modal, Alert } from '@mui/material';


export default function OperatorForm() {
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const warehouseOptions = [
  	{value: "6161ee0f3a6c3f8d27ca287f", label: "513-107"},
  	{value: "6161ee163a6c3f8d27ca2883", label: "513-108"},
  	{value: "6161ee513a6c3f8d27ca288b", label: "510-128"},
  	{value: "6161ee553a6c3f8d27ca288f", label: "510-129"}
  ];

  const operatorOptions = [
  	{value: "6161e0133a6c3f8d27ca286a", label: "Operator A"},
  	{value: "6161e02c3a6c3f8d27ca2871", label: "Operator B"},
  	{value: "6162bbfec7f038a8b14d4a66", label: "Operator Test"}
  ];

	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		console.log(data);

		const sendData = {	
			startTime: new Date(data.date + " " + data.startTime),
			endTime: new Date(data.date + " " + data.endTime),
			origin: data.origin, // need ID
			destination: data.destination, // need ID
			load: data.load,
			operator: data.operator, // need ID
			cfsAdmin: data.cfsAdmin // need ID	
		};

		console.log(sendData);

		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData)
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
							<TextField sx={{ minWidth: 1/3 }} defaultValue="6161dfaf3a6c3f8d27ca2864" variant="outlined" {...register("cfsAdmin")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Operator</InputLabel>
							<Select defaultValue="" label="Select an Operator" sx={{ minWidth: 1/3 }} variant="outlined" {...register("operator")} >
								{operatorOptions.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
							</Select>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Date</InputLabel>
							<TextField sx={{ minWidth: 1/3 }} type="date" variant="outlined" {...register("date")} />
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
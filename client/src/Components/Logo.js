import { Box, Typography } from '@mui/material';
import { flexbox, sizing } from '@mui/system';

export default function Logo({ height }) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ display: 'flex',
									flexDirection: 'column', 
									flexWrap: 'wrap',
									height: height,
									width: height }}>
				<Box sx={{ width: 1/2, height: 1/3, backgroundColor: '#A8DADC' }} />
				<Box sx={{ width: 1/2, height: 2/3, backgroundColor: '#1D3557' }}/>
				<Box sx={{ width: 1/2, height: 2/3, backgroundColor: '#1D3557' }} />
				<Box sx={{ width: 1/2, height: 1/3, backgroundColor: '#f3722c' }}/>
			</Box>
			<Typography variant='h4'>Next Truck</Typography>
		</Box>
	)
}
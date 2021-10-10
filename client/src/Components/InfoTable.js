import { Table, TableBody, TableContainer, TableRow, TableCell, TableHead, Paper, Typography } from '@mui/material';

export default function InfoTable({ title, headings , datasets }) {
	return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem", padding: "1rem" }}>
    	<Typography variant="h4">{title}</Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
          	{ headings.map((heading) => (<TableCell align="left" key={heading}>{heading}</TableCell>)) }
          </TableRow>
        </TableHead>
        <TableBody>
        	{ datasets.map((dataset) => (
        		<TableRow key={dataset} >
        			{dataset.map((data) => (
        				<TableCell align="left" key={data}>
        					{data}
        				</TableCell>
        				))}
        		</TableRow>
        		))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
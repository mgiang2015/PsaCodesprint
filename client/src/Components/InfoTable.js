import { Table, TableBody, TableContainer, TableRow, TableCell, TableHead, Paper } from '@mui/material';

export default function InfoTable({ title, headings , datasets }) {
	return (
    <TableContainer component={Paper}>
    	<Typography variant="h3">{title}</Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
          	{ headings.map((heading) => (<TableCell align="left" key={heading}>{heading}</TableCell>)) }
          </TableRow>
        </TableHead>
        <TableBody>
        	{ datasets.map((dataset) => (
        		<TableRow key={dataset[0]} >
        			{dataset.map((data) => (
        				<TableCell align="left" key={data}>
        					{dataset}
        				</TableCell>
        				))}
        		</TableRow>
        		))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import { Box } from "@mui/material";

export function PaddingY({ padding }) {
    return(
        <Box sx={{py: padding}}/>
    )
}

export function PaddingX({ padding }) {
    return(
        <Box sx={{px: padding}}/>
    )
}
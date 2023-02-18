import React from "react"
import { Container,Paper,Typography,Divider,Button } from "@mui/material"

const QuizQuestion = (props) => {
    return(
        <Container align="center">
            <Paper sx={{marginTop:2}} elevation={24}>
                <Typography fontSize={"2rem"}>Question:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>Question content</Typography>
                <Divider/>
                <Typography fontSize={"2rem"}>Answer:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>Answer content</Typography>
                <Divider/>
                <Container sx={{display:"flex",justifyContent:"space-around"}}>
                    <Button sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Correct</Button>
                    <Button sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Incorrect</Button>
                    <Button sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Interrupted</Button>
                </Container>
            </Paper>
        </Container>
    )
}

export default QuizQuestion
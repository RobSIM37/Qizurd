import { SPINNER_LOADING, SPINNER_ERROR, SPINNER_HIDDEN } from "../consts";
import { CircularProgress, Card, Typography } from '@mui/material';
const Spinner = (props) => {
    const {status, errorText} = props;

    switch (status) {
        case SPINNER_LOADING:
            return (
                <Card sx={{margin:"2rem"}} elevation={12}>
                    <CircularProgress></CircularProgress>
                </Card>
            );
        case SPINNER_ERROR:
            return (
                <Card sx={{margin:"2rem"}} elevation={12}>
                    <Typography>{`Error: ${errorText}`}</Typography>
                </Card>
            );
        case SPINNER_HIDDEN:
            return;
        default:
            return;
    }

}

export default Spinner;
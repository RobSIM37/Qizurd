import React from "react" 
import { FormContainer, LabelStyles, StudentFormStyles, InputBoxStyle } from "./formStyles"

const CreateStudent = () => {
    return( 
    <FormContainer>
        <StudentFormStyles>
            <LabelStyles>Student name</LabelStyles>
            <InputBoxStyle/>
        </StudentFormStyles>
    </FormContainer>
    )
}

export default CreateStudent
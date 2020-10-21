import React, { memo } from 'react'
import { Alert } from 'reactstrap';
import { AlertCircle } from 'react-feather';

const AlertDanger = ({title}) => (
    <Alert color="danger" isOpen={true}>
        <AlertCircle size={15} />{" "}
        <span>
            {title}
        </span>
    </Alert>
)

AlertDanger.defaultProps = {
    title : ''
}

export default memo(AlertDanger);
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Subtitle from './Subtitle'

export default function Title({title, subtitle}) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom={!subtitle}>
        {title}
      </Typography>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </React.Fragment>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

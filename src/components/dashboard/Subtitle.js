import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Subtitle({color, children}) {
  return (
    <Typography component="h2" variant="subtitle2" color={!color ? "primary" : color} gutterBottom>
      {children}
    </Typography>
  );
}

Subtitle.propTypes = {
  children: PropTypes.node,
};

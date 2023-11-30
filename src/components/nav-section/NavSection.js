import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText,ListItemButton, Collapse,ListItemIcon } from '@mui/material';
import { ExpandMore,ExpandLess } from '@mui/icons-material';
import { StyledNavItem, StyledNavItemIcon } from './styles';



// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, child} = item;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
  <>
<StyledNavItem>
      <ListItemButton onClick={handleClick}>
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText  disableTypography primary={title} 
        component={RouterLink}
      to={path} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </StyledNavItem>
      {child ? 
      <Collapse in={open} timeout="auto" unmountOnExit sx={{fontFamily:'Public Sans',fontSize:14,color:'#637381'}}>
    <List component="div" disablePadding>
    {
    child.map((item) => (
      <ListItemButton 
          component={RouterLink}
          to={item.path}
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            }
    
          }}>
        <ListItemIcon >
        <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>
        </ListItemIcon>
        <ListItemText disableTypography primary={item.title}/>
      </ListItemButton> 
        ))}
    </List>
  </Collapse> : null}
</>
  );
}


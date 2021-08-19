import React, { useState, useRef, useEffect } from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useStyle } from './menu-popper.style';
import { IPopperMenuItems } from './menu-popper.interface';
import { ListItemIcon, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PopperMenu: React.FC<IPopperMenuItems> = ({ items, icon: Icon }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ open, setOpen ] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  /**
   * Handle Keyboard Event
   * @param {Object} event
   * @return {void}
   */
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-haspopup="true"
        onClick={handleToggle}
        aria-controls={open ? 'menu-list' : undefined}
      >
        <Icon />
      </IconButton>
      <Popper
        transition
        open={open}
        disablePortal
        placement={'bottom-end'}
        role={undefined}
        className={classes.popper}
        anchorEl={anchorRef.current}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="menu-list"
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                >
                  {items.map(({ icon: Icon, label, clickHandler }, index) => (
                    <MenuItem
                      onClick={(
                          event: React.MouseEvent<HTMLLIElement, MouseEvent>
                      ) => {
                        clickHandler();
                        handleClose(event);
                      }}
                      key={index}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        <Icon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">{ t(label) }</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export { PopperMenu };

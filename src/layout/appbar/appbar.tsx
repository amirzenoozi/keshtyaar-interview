import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { DotBadge } from 'src/components/static/dot-badge';
import { GrayIconButton } from 'src/components/static/gray-icon-button';
import actions from 'src/redux/actions';
import { AppState } from 'src/redux/store';
import { CustomAppbarProps } from './appbar.interface';
import { useStyle } from './appbar.style';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { isChrome } from 'react-device-detect';

// Material-UI Component
import { AppBar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { MenuProps } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

// Materil-UI Icons
import { Close } from '@material-ui/icons';
import { Language } from '@material-ui/icons';
import { Notifications } from '@material-ui/icons';
import { Mic } from '@material-ui/icons';
import { Widgets } from '@material-ui/icons';

const commands = [
  {
    command: [ 'plate', 'licence plate' ],
    callback: (food: any) => console.warn(food),
    matchInterim: true,
  },
];

const CustomAppbar: React.FC<CustomAppbarProps> = ({ drawerWidth }) => {
  const classes = useStyle({ drawerWidth });
  const history = useHistory();
  const { pathname } = useLocation();
  const { url } = useRouteMatch();
  const { search } = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(search);
  const dashboardName = query.get('dash');
  const location = useLocation();

  const [ langAnchorEl, setLangAnchorEl ] = React.useState<null | HTMLElement>(null);
  const [ languageList, setLanguageList ] = useState([
    { title: 'Persian', slug: 'fa', direction: 'rtl', flag: 'IR' },
    { title: 'English', slug: 'en', direction: 'ltr', flag: 'US' },
  ]);

  const { drawer } = useSelector((state: AppState) => {
    return {
      drawer: state.AppSetting.drawer,
      direction: state.AppSetting.direction,
    };
  });
  const { locale } = useSelector((state: AppState) => state.AppSetting);
  const { avatar, firstName } = useSelector((state: AppState) => state.User);
  const [ transcribing, setTranscribing ] = useState(true);
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ transcribing, commands });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const changeLanguage = (language: any) => {
    // TODO: testing direction
    setLangAnchorEl(null);
    i18n.changeLanguage(language.slug);
    dispatch(actions.AppSetting.setDirection(language.direction));
    dispatch(actions.AppSetting.setLocale(language.slug));
  };

  const toggleVoiceCommand = () => {
    if ( listening ) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        continuous: false,
        language: 'en-GB',
      });
    }
  };

  useEffect(() => {
    if (locale) {
      const lng = languageList.filter((lang) => lang.slug === locale)[0];
      changeLanguage(lng);
    }
  }, [locale]);

  useEffect(() => {
    if (finalTranscript === '') return;
    console.warn('Got final result:', finalTranscript);
  }, [finalTranscript]);

  return (
    <>
      <AppBar color="transparent" elevation={5} position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawer })}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.appBarRight}>
            <Box className={classes.appBarInfo}>
              <Avatar src={avatar} />
              <Box className={classes.userName}>
                <Typography noWrap>
                  {t('general.hi')} ,{' '}
                  <strong>
                    <i>{(firstName) ? firstName : t('general.name')}</i>
                  </strong>
                </Typography>
                <Typography variant="caption">{t('role.admin')}</Typography>
              </Box>
            </Box>

            <Box className={classes.appBarIcons}>
              <GrayIconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setLangAnchorEl(event.currentTarget)
                }
              >
                <Language />
              </GrayIconButton>
              <StyledMenu
                anchorEl={langAnchorEl}
                keepMounted
                open={Boolean(langAnchorEl)}
                onClose={() => setLangAnchorEl(null)}
                className={classes.localizationMenu}
              >
                {languageList.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      const pathList = pathname.split('/');
                      pathList.splice(1, 1);
                      changeLanguage(item);
                      history.push(`/${item.slug}${pathList.join('/')}`);
                    }}
                  >
                    <ReactCountryFlag
                      countryCode={item.flag}
                      style={{ fontSize: '1.5em' }}
                    />
                    <span className={classes.languageItem}>{item.title}</span>
                  </MenuItem>
                ))}
              </StyledMenu>
              { isChrome && <GrayIconButton onClick={toggleVoiceCommand}>
                <Mic/>
              </GrayIconButton>}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

const StyledMenu = withStyles((theme) => ({
  paper: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.14)',
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export { CustomAppbar as Appbar };

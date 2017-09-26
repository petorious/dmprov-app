import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import allThemes from '../../themes';
import allLocales from '../../locales';
import firebase from 'firebase';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';

const DrawerContent = (props, context) => {

  const {
    responsiveDrawer,
    setResponsive,
    theme,
    locale,
    updateTheme,
    updateLocale,
    intl,
    muiTheme,
    auth,
    dialogs,
    match,
    firebaseApp,
    setDialogIsOpen,
    messaging,
    isGranted
  }=props;

  const isAuthorised = auth.isAuthorised;

  const handleChange = (event, index) => {
    const {history, responsiveDrawer, setDrawerOpen} = props;

    if(responsiveDrawer.open && index!==undefined){
      setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      history.push(index);
    }
  };

  const themeItems = allThemes.map((t)=>{
    return {
      value:undefined,
      visible: true,
      primaryText: intl.formatMessage({id: t.id}),
      onClick: ()=>{updateTheme(t.id)},
      rightIcon: <FontIcon
        className="material-icons"
        color={t.id===theme?muiTheme.palette.primary1Color:undefined}>
        style
      </FontIcon>
    }
  });

  const localeItems=allLocales.map((l)=>{

    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({id: l.locale}) ,
      onClick: ()=>{updateLocale(l.locale)},
      rightIcon: <FontIcon
        className="material-icons"
        color={l.locale===locale?muiTheme.palette.primary1Color:undefined}>
        language
      </FontIcon>
    }
  });



  const menuItems=[
    {
      primaryText: intl.formatMessage({id: '[active_campaign_name]'}),
      primaryTogglesNestedList: true,
    },
    {
      value:'/[active_campaign_name]',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'campaign dashboard'}),
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    
     {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'Campaigns'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >import_contacts</FontIcon>,
      nestedItems:[
        {
          value:'/recent',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'recent'}),
          leftIcon: <FontIcon className="material-icons" >history</FontIcon>,
        },
        {
          value:'/archived',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Archived'}),
          leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
        },
        {
          value:'/add_new',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'New'}),
          leftIcon: <FontIcon className="material-icons" >addnew</FontIcon>,
        }
      ]
    },

    {
      divider:true,
      visible: isAuthorised,
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'Assets'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >add_circle</FontIcon>,
      nestedItems:[
        {
          value:'/Encounters',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Encounters'}),
          leftIcon: <FontIcon className="material-icons" >person</FontIcon>,
        },
        {
          value:'/NPCs',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'NPCs'}),
          leftIcon: <FontIcon className="material-icons" >group</FontIcon>,
        },
        {
          value:'/locations',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Locations'}),
          leftIcon: <FontIcon className="material-icons" >explore</FontIcon>,
        }
      ]
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'Widgets'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >widgets</FontIcon>,
      nestedItems:[
        {
          value:'/generators',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Generators'}),
          leftIcon: <FontIcon className="material-icons" >book</FontIcon>,
        },
        {
          value:'/organizers',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Organizers'}),
          leftIcon: <FontIcon className="material-icons" >timeline</FontIcon>,
        },
        {
          value:'/operators',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'predefined_messages'}),
          leftIcon: <FontIcon className="material-icons" >textsms</FontIcon>,
        },
        {
          primaryText: intl.formatMessage({id: 'Operators'}),
          leftIcon: <FontIcon className="material-icons" >work</FontIcon>,
        },
        {
          value:'/boards',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Boards'}),
          leftIcon: <FontIcon className="material-icons" >box</FontIcon>,
        }, 
        {
          value:'/other tools',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Other Tools'}),
          leftIcon: <FontIcon className="material-icons" >build</FontIcon>,
        }, 
      ]
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'Media'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >perm_media</FontIcon>,
      nestedItems:[
        {
          value:'/images',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Images'}),
          leftIcon: <FontIcon className="material-icons" >image</FontIcon>,
        },
        {
          value:'/sounds',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Sounds'}),
          leftIcon: <FontIcon className="material-icons" >audiotrack</FontIcon>,
        },
        {
          value:'/other',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'Other'}),
          leftIcon: <FontIcon className="material-icons" >picture_as_pdf</FontIcon>,
        },
             
      ]
    },
    {
      divider:true,
      visible: isAuthorised,
    },
    
    {
      value:'/Campaign_settings',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'Campaign Settings'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,

    },
    {
      value:'/morestorage',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: '34 of 50 assets used'}),

    },
  ];

  const handleSignOut = () =>{

    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/connections`).remove();
    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/notificationTokens/${messaging.token}`).remove();
    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/lastOnline`).set(firebase.database.ServerValue.TIMESTAMP);
    firebaseApp.auth().signOut().then(()=>{
      setDialogIsOpen('auth_menu', false);
    });
  };

  const authItems=[
    {
      value:'/my_account',
      primaryText: intl.formatMessage({id: 'my_account'}),
      leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>
    },
    {
      primaryText: intl.formatMessage({id: 'App Settings'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,
      nestedItems:[
        {
          primaryText: intl.formatMessage({id: 'theme'}),
          secondaryText: intl.formatMessage({id: theme}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >style</FontIcon>,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'language'}),
          secondaryText: intl.formatMessage({id: locale}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >language</FontIcon>,
          nestedItems: localeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'responsive'}),
          leftIcon: <FontIcon className="material-icons" >chrome_reader_mode</FontIcon>,
          rightToggle: <Toggle
            toggled={responsiveDrawer.responsive}
            onToggle={
              () => {setResponsive(!responsiveDrawer.responsive)}
            }
          />,
        },
      ]
    },
    {
      visible: isAuthorised, //In prod: isGranted('App Dashboard'),
      value:'/dashboard',
      primaryText: intl.formatMessage({id: 'App dashboard'}),
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>,
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'chats'}),
      primaryTogglesNestedList: true,

      leftIcon: <FontIcon className="material-icons" >list</FontIcon>,
    },
    {
      value:'/about',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'About'}),
      leftIcon: <FontIcon className="material-icons" >info_outline</FontIcon>,
    },
    {
      visible: isAuthorised, //In prod: isGranted('administration'),
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({id: 'administration'}),
      leftIcon: <FontIcon className="material-icons" >security</FontIcon>,
      nestedItems:[
        {
          value:'/users',
          visible: isAuthorised, //In prod: isGranted('read_users'),
          primaryText: intl.formatMessage({id: 'users'}),
          leftIcon: <FontIcon className="material-icons" >group</FontIcon>,
        },
        {
          value:'/roles',
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({id: 'roles'}),
          leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>,
        },
      ]
    },
    {
      value:'/signin',
      onClick: handleSignOut,
      primaryText: intl.formatMessage({id: 'sign_out'}),
      leftIcon: <FontIcon className="material-icons" >lock</FontIcon>
    },

  ];


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
    <SelectableMenuList
      items={dialogs.auth_menu?authItems:menuItems}
      onIndexChange={handleChange}
      index={match?match.path:'/'}
    />

  </div>

);
}

export default injectIntl(muiThemeable()(withRouter(withFirebase(DrawerContent))));

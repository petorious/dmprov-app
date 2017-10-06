import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import allThemes from '../../themes';
import allLocales from '../../locales';
import firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';

const DrawerContent = (props, context) => {

  const {
    responsiveDrawer,
    setResponsive,
    theme,
    currentCampaignUid,
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
// attempt at doing the campaign active name thing

  const nameItem = (i, k) => {
    const { list, intl, currentCampaignUid, muiTheme } = this.props;

    const key=list[i].key;
    const val=list[i].val;

    return <div key={i}>
      <ListItem
        key={key}
        id={key}
        primaryText={val.campaign_name}
      />
      <Divider inset={true}/>
    </div>;
  }


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

      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'active_campaign'}),

  
    }, 
    
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'campaigns'}),
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
          value:'/campaigns',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'archive'}),
          leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
        },
        {
          value:'/campaigns/create',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'new'}),
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
      primaryText: intl.formatMessage({id: 'assets'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >add_circle</FontIcon>,
      nestedItems:[

            
        {
          value:'/assets',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'archive'}),
          leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
        },
        {
          value:'/assets/create',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'new'}),
          leftIcon: <FontIcon className="material-icons" >add</FontIcon>,
        },
        {
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'type'}),
          leftIcon: <FontIcon className="material-icons" >filter</FontIcon>,
          nestedItems:[
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'encounters'}),
              leftIcon: <FontIcon className="material-icons" >person</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'NPCs'}),
              leftIcon: <FontIcon className="material-icons" >group</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'locations'}),
              leftIcon: <FontIcon className="material-icons" >explore</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'vehicles'}),
              leftIcon: <FontIcon className="material-icons" >person</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'items'}),
              leftIcon: <FontIcon className="material-icons" >group</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'organizations'}),
              leftIcon: <FontIcon className="material-icons" >explore</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'puzzles_traps'}),
              leftIcon: <FontIcon className="material-icons" >person</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'spells_powers'}),
              leftIcon: <FontIcon className="material-icons" >group</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'conditions'}),
              leftIcon: <FontIcon className="material-icons" >explore</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'notes'}),
              leftIcon: <FontIcon className="material-icons" >explore</FontIcon>,
            },     
          ]
        },
      ]
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'widgets'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >widgets</FontIcon>,
      nestedItems:[
        {
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'generators'}),
          leftIcon: <FontIcon className="material-icons" >book</FontIcon>,
          nestedItems:[
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'ranfiltrator'}),
              leftIcon: <FontIcon className="material-icons" >history</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'radient'}),
              leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'weather'}),
              leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
            },
          ]
        },
        {
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'operators'}),
          leftIcon: <FontIcon className="material-icons" >work</FontIcon>,
          nestedItems:[
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'initiative_tracker'}),
              leftIcon: <FontIcon className="material-icons" >history</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'dice_roller'}),
              leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'combat_helper'}),
              leftIcon: <FontIcon className="material-icons" >archive</FontIcon>,
            },
          ]
        },
        
        {
          primaryText: intl.formatMessage({id: 'reference'}),
          leftIcon: <FontIcon className="material-icons" >book</FontIcon>,
        },
        {
          value:'/boards',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'boards'}),
          leftIcon: <FontIcon className="material-icons" >box</FontIcon>,
          nestedItems:[
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'kanban'}),
              leftIcon: <FontIcon className="material-icons" >history</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'timeline'}),
              leftIcon: <FontIcon className="material-icons" >timeline</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'map'}),
              leftIcon: <FontIcon className="material-icons" >map</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'family_tree'}),
              leftIcon: <FontIcon className="material-icons" >tree</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'heroes_cycle'}),
              leftIcon: <FontIcon className="material-icons" >circle</FontIcon>,
            },
          ]
        }, 
        {
          value:'/other tools',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'other_tools'}),
          leftIcon: <FontIcon className="material-icons" >build</FontIcon>,
          nestedItems:[
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'messenger'}),
              leftIcon: <FontIcon className="material-icons" >sms</FontIcon>,
            },
            {
              visible: isAuthorised,
              primaryText: intl.formatMessage({id: 'scheduler'}),
              leftIcon: <FontIcon className="material-icons" >calendar</FontIcon>,
            },
          ]
        }, 
         {
          value:'/widget/create',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'create'}),
          leftIcon: <FontIcon className="material-icons" >add_circle</FontIcon>,
        }, 
      ]
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'media'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >perm_media</FontIcon>,
      nestedItems:[
        {
          value:'/images',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'images'}),
          leftIcon: <FontIcon className="material-icons" >image</FontIcon>,
        },
        {
          value:'/sounds',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'sounds'}),
          leftIcon: <FontIcon className="material-icons" >audiotrack</FontIcon>,
        },
        {
          value:'/other',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'other'}),
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
      primaryText: intl.formatMessage({id: 'campaign_settings'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,

    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'assets_used'}),
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
      primaryText: intl.formatMessage({id: 'app_settings'}),
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
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'chats'}),
      primaryTogglesNestedList: true,

      leftIcon: <FontIcon className="material-icons" >list</FontIcon>,
    },
    {
      value:'/about',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'about'}),
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
          visible: isGranted, //In prod: isGranted('App Dashboard'),
          value:'/dashboard',
          primaryText: intl.formatMessage({id: 'app_dashboard'}),
          leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>,
        },
        {
          value:'/roles',
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({id: 'roles'}),
          leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>,
        },
        {
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({id: 'global_db'}),
          leftIcon: <FontIcon className="material-icons" >storage</FontIcon>,
          nestedItems:
          [
           {
            value:'/global/campaigns',
            visible: isGranted,
            primaryText: intl.formatMessage({id: 'campaigns'}),
            leftIcon: <FontIcon className="material-icons" >import_contacts</FontIcon>,
           },
           {
            value:'/global/assets',
            visible: isGranted,
            primaryText: intl.formatMessage({id: 'assets'}),
            leftIcon: <FontIcon className="material-icons" >add_circle</FontIcon>,
           },
           {
            value:'/global/widgets',
            visible: isGranted,
            primaryText: intl.formatMessage({id: 'campaigns'}),
            leftIcon: <FontIcon className="material-icons" >widgets</FontIcon>,
           },
           {
            value:'/global/media',
            visible: isGranted,
            primaryText: intl.formatMessage({id: 'media'}),
            leftIcon: <FontIcon className="material-icons" >perm_media</FontIcon>,
           },
          ]
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

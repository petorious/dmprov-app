import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from '../../containers/Activity';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { FireForm } from 'firekit';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import CampaignForm from '../../components/Forms/CampaignForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit';
import { change, submit } from 'redux-form';
import isGranted  from '../../utils/auth';


const path='/campaigns/';
const form_name='campaign';

class Campaign extends Component {

  componentDidMount() {
    this.props.watchList('users');
  }
 
  validate = (values) => {
    const { intl } = this.props;
    const errors = {}

    errors.capaign_name = !values.campaign_name?intl.formatMessage({id: 'error_required_field'}):'';
    errors.campaign_short_description = !values.campaign_short_description?intl.formatMessage({id: 'error_required_field'}):'';
    errors.campaign_full_description = !values.campaign_full_description?intl.formatMessage({id: 'error_required_field'}):'';
    errors.system = !values.system?intl.formatMessage({id: 'error_required_field'}):'';
    errors.player_count = !values.player_count?intl.formatMessage({id: 'error_required_field'}):'';
    errors.tags = !values.tags?intl.formatMessage({id: 'error_required_field'}):'';
    errors.vat = !values.vat?intl.formatMessage({id: 'error_required_field'}):'';


    return errors
  } 
 
 
  handleUpdateValues = (values) => {

    return {
      updated: firebase.database.ServerValue.TIMESTAMP ,
      ...values
    }
  }

  handleCreateValues = (values) => {
    // var user = firebase.auth().currentUser;

    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     console.log("Sign-in provider: "+profile.providerId);
    //     console.log("  Provider-specific UID: "+profile.uid);
    //     console.log("  Name: "+profile.displayName);
    //     console.log("  Email: "+profile.email);
    //     console.log("  Photo URL: "+profile.photoURL);
    //   });
    // }
  
    const { firebaseApp, path, auth, uid}=this.props;
    
    return {

      created: firebase.database.ServerValue.TIMESTAMP ,
        userId: auth.uid,
        // authorName: provider.displayName,
        authorUid: auth.uid,
        // userName: provider.displayName,
      ...values
    }
  }

  handleClose = () => {
    const { setDialogIsOpen }=this.props;

    setDialogIsOpen('delete_campaign', false);

  }

  handleDelete = () => {

    const {history, match, firebaseApp}=this.props;
    const uid=match.params.uid;

    if(uid){
      firebaseApp.database().ref().child(`${path}${uid}`).remove().then(()=>{
        this.handleClose();
        history.goBack();
      })
    }
  }


  render() {

    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      match,
      submit,
      muiTheme,
      isGranted
    }=this.props;

    const uid=match.params.uid;


    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onClick={this.handleDelete}
      />,
    ];

    const menuList=[
      {
        hidden: (uid===undefined && !isGranted(`create_${form_name}`)) || (uid!==undefined && !isGranted(`edit_${form_name}`)),
        text: intl.formatMessage({id: 'save'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        tooltip:intl.formatMessage({id: 'save'}),
        onClick: ()=>{submit('campaign')}
      },
      {
        hidden: uid===undefined || !isGranted(`delete_${form_name}`),
        text: intl.formatMessage({id: 'delete'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>delete</FontIcon>,
        tooltip: intl.formatMessage({id: 'delete'}),
        onClick: ()=>{setDialogIsOpen('delete_campaign', true);}
      }
    ]

    return (
      <Activity
        iconStyleRight={{width:'50%'}}
        iconElementRight={
          <div>
            <ResponsiveMenu
              iconMenuColor={muiTheme.palette.canvasColor}
              menuList={menuList}
            />
          </div>
        }

        onBackClick={()=>{history.goBack()}}
        title={intl.formatMessage({id: match.params.uid?'edit_campaign':'create_campaign'})}>

        <div style={{margin: 15, display: 'flex'}}>

          <FireForm
            name={'campaign'}
            path={`${path}`}
            validate={this.validate}
            onSubmitSuccess={(values)=>{history.push('/campaigns');}}
            onDelete={(values)=>{history.push('/campaigns');}}
            handleCreateValues={this.handleCreateValues}
            uid={match.params.uid}>
            <CampaignForm />
          </FireForm>
        </div>
        <Dialog
          title={intl.formatMessage({id: 'delete_campaign_title'})}
          actions={actions}
          modal={false}
          open={dialogs.delete_campaign===true}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({id: 'delete_campaign_message'})}
        </Dialog>

      </Activity>
    );
  }
}

Campaign.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => {
  const { intl, dialogs, auth } = state;

  return {
    intl,
    auth,
    dialogs,
    isGranted: grant=>isGranted(state, grant)
  };
};

export default connect(
  mapStateToProps, {setDialogIsOpen, change, submit}
)(injectIntl(withRouter(withFirebase(muiThemeable()(Campaign)))));

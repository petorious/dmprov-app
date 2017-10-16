import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {Field, reduxForm, formValueSelector, } from 'redux-form';
import {SuperSelectField} from '../../containers/SuperSelectField';
//import firebase from 'firebase';
import { TextField, } from 'redux-form-material-ui';
//import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
//import { setSimpleValue } from '../../store/simpleValues/actions';
import {ListItem } from 'material-ui/List';
//import Divider from 'material-ui/Divider';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';



class CampaignForm extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_campaign_photo', undefined);
  }

  // handleCreateValues = (values) => {
  //   const { auth, firebaseApp, path } = this.props
  //   return {
  //     created: firebase.database.ServerValue.TIMESTAMP ,
  //     userName: auth.displayName,
  //     userId: auth.uid,
  //     completed: false,
  //     ...values
  //   }
  // }

  //handleToggle = (bool) => 


  // handleItemClick = (val, key) => {
  //   const { history, setPersistentValue, firebaseApp, auth } = this.props;

  //   if(val.toggle=false){
  //     firebaseApp.database().ref(`campaigns/${uid}`)val.false.remove();

  //   }else{
  //     firebaseApp.database().ref(`campaigns/${uid}`)val.true.push();

  //     history.push(`/chats/edit/${key}`);
  //   }
  // } 
  // handleLinkTagsToggleChange = (e, i, isInputChecked, key) => {
  //   const { firebaseApp, match } = this.props;
  //   const uid=match.params.uid;

  //   if(isInputChecked){
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).set(true);
  //   }else{
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).remove();
  //   }

  // }
  // handleLinkWidgetsToggleChange = (e, i, isInputChecked, key) => {
  //   const { firebaseApp, match } = this.props;
  //   const uid=match.params.uid;

  //   if(isInputChecked){
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).set(true);
  //   }else{
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).remove();
  //   }

  // }

  // handleIsPublicToggleChange = (e, i, isInputChecked, key) => {
  //   const { firebaseApp, match } = this.props;
  //   const uid=match.params.uid;

  //   if(isInputChecked){
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).set(true);
  //   }else{
  //     firebaseApp.database().ref(`/campaigns/${uid}/${key}`).remove();
  //   }

  // }

  render() {
    const{
      handleSubmit,
     //handleItemClick,
    //setPersistentValue,
      intl,
      initialized,
   // i,
   // auth,
      setDialogIsOpen,
      dialogs,
      match,
    } = this.props;

    const uid=match.params.uid;
    // let linkTags=[];
    // let linkWidgets=[];
    // let isPublic=[];
    // const key=i;
    // const val=[i];


    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
      <button type="submit" style={{display: 'none'}} />

      <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>

        <div>
          <Field
            name="photoURL"
            size={120}
            component={Avatar}
            icon={
              <FontIcon
                className="material-icons">
                import_contacts
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>

        <FlatButton
          onClick={()=>{
            setDialogIsOpen('new_campaign_photo', true)
          }}
          disabled={uid===undefined || !initialized}
          containerElement='label'
          primary={true}
          icon={
            <FontIcon
              className="material-icons">
              photo_camera
            </FontIcon>
          }
        />
      </div>

      <div>
        <div>
          <Field
            name="campaign_name"
            component={TextField}
            hintText={intl.formatMessage({id: 'campaign_name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'campaign_label'})}
            ref="campaign_name"
            withRef
          />
        </div>

        <div>
          <Field
            name="campaign_short_description"
            component={TextField}
            hintText={intl.formatMessage({id: 'campaign_slug_hint'})}
            floatingLabelText={intl.formatMessage({id: 'campaign_slug_label'})}
            ref="campaign_short_description"
            withRef
          />
        </div>

        <div>
          <Field
            name="vat"
            component={TextField}
            hintText={intl.formatMessage({id: 'vat_hint'})}
            floatingLabelText={intl.formatMessage({id: 'vat_label'})}
            ref="vat"
            withRef
          />
        </div>

        <div>
           <ListItem
              disabled={true}/>
           <Field
              name="player_count"
              elementHeight={60}
              component={SuperSelectField}
              hintText={intl.formatMessage({id: 'player_count'})}
              ref="player_count"
              withRef
            >
            <MenuItem value={1} label="2" primaryText="2"/>
            <MenuItem value={2} label="3" primaryText="3"/>
            <MenuItem value={3} label="4" primaryText="4"/>
            <MenuItem value={4} label="5" primaryText="5"/>
            <MenuItem value={5} label="6" primaryText="6"/>
            <MenuItem value={5} label="7" primaryText="7"/>
            <MenuItem value={5} label="8" primaryText="8" />
          
           </Field>
          </div>

        <div>
          <Field
            name="full_description"
            component={TextField}
            multiLine={true}
            rows={2}
            hintText={intl.formatMessage({id: 'full_description_hint'})}
            floatingLabelText={intl.formatMessage({id: 'description_label'})}
            ref="full_description"
            withRef
          />
        </div>
        <div>
           <ListItem
              disabled={true}/>
           <Field
              name="system"
              elementHeight={60}
              component={SuperSelectField}
              hintText={intl.formatMessage({id: 'system_hint'})}
              ref="system"
              withRef
            >
            <MenuItem value={1} label="5e DnD" primaryText="5e DnD" 
                  />
            <MenuItem value={2} label="3.5 DnD" primaryText="3.5e DnD" 
                  />
            <MenuItem value={3} label="Pathfinder" primaryText="Pathfinder" 
                  />
            <MenuItem value={4} label="Star Wars FFG" primaryText="Star Wars FFG" 
                  />
            <MenuItem value={5} label="7e CoC" primaryText="7e CoC"
                  />
            <MenuItem value={5} label="7e Shadowrun" primaryText="7e Shadowrun" />
            </Field>
          </div>
          <div>
           <ListItem
              disabled={true}/>
          
            <Field
              name="genre"
              component={SuperSelectField}
              hintText={intl.formatMessage({id: 'genre_hint'})}
              ref="genre"
              withRef
            >
            <MenuItem value={1} label="Fantasy" primaryText="Fantasy" />
            <MenuItem value={2} label="Steampunk" primaryText="Steampunk" />
            <MenuItem value={3} label="Cyberpunk" primaryText="Cyberpunk" />
            <MenuItem value={4} label="Space" primaryText="Space" />
            <MenuItem value={5} label="Modern" primaryText="Modern" />
            <MenuItem value={5} label="Noir" primaryText="Noir" />
            </Field>
          </div>





        <ImageCropDialog
          path={`${uid}/campaigns/`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
          open={dialogs.new_campaign_photo!==undefined}
          src={dialogs.new_campaign_photo}
          handleClose={()=>{setDialogIsOpen('new_campaign_photo',undefined)}}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </div>

    </form>
  );
}
}

CampaignForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object,
  uid: PropTypes.string.isRequired,
};


CampaignForm=reduxForm({form: 'campaign'})(CampaignForm);
const selector = formValueSelector('campaign')

const mapStateToProps = (state, ownProps) => {
  const { intl, vehicleTypes, users, dialogs, } = state;
  const { uid } = ownProps;

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    uid,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(CampaignForm))));

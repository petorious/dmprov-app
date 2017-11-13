import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { reducer as formReducer } from 'redux-form';
import persistentValues from './persistentValues/reducer';
import simpleValues from './simpleValues/reducer';
import dialogs from './dialogs/reducer';
import locale from './locale/reducer';
import grids from './grids/reducer';
import theme from './theme/reducer';
import assets from './grids/reducer';
import firekitReducers from 'firekit';
import { filterReducer } from 'material-ui-filter';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  dialogs,
  persistentValues,
  simpleValues,
  grids,
  assets,
  locale,
  theme,
  ...firekitReducers,
  filters: filterReducer
})

export default reducers;

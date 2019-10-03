import { connect } from 'react-redux'
import ContentMenuItem from '../../components/ContentMenuItem';

const mapStateToProps = (state) => {
  return {
    appContent: state.isShown
  }
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}*/

const ConnectedContentMenuItem = connect(
  mapStateToProps
)(ContentMenuItem)

export default ConnectedContentMenuItem;
import { connect } from 'react-redux'
import Content from '../../components/Content';

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

const ConnectedContent = connect(
  mapStateToProps
)(Content)

export default ConnectedContent;
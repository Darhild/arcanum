import { connect } from 'react-redux'
import Content from '../../components/Content';

const mapStateToProps = (state) => {
  return {
    content: state.isShown
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

const ContentContainer = connect(
  mapStateToProps
)(Content)

export default ContentContainer;
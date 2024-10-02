import PropTypes from "prop-types"

export const Login = ({switchAuthHandler}) => {
  return (
    <span onClick={switchAuthHandler}>Este es el componente del login</span>
  )
}

Login.propTypes = {
    switchAuthHandler: PropTypes.func.isRequired
}

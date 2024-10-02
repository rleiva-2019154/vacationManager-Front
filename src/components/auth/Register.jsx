import PropTypes from "prop-types"

export const Register = ({switchAuthHandler}) => {
  return (
    <span onClick={switchAuthHandler}>Este es el componente del Register</span>
  )
}

Register.propTypes = {
    switchAuthHandler: PropTypes.func.isRequired
}

import PropTypes from 'prop-types'


const Button = ({ title, color, action }) => {
    return (
        <button className='btn' style={{ backgroundColor: color }} onClick={action}>{title}</button>

    )
}

export default Button

Button.propTypes = {
    title: PropTypes.string.isRequired,
    color:PropTypes.string,
    action:PropTypes.func.isRequired
}

Button.defaultProps = {
    color: 'skyblue'
}
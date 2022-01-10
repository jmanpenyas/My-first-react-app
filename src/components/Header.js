import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({ title, onAdd, showAdd }) => {

    return (
        <header className='header'>
            <h1 >{title}</h1>
            <Button color={showAdd ?'Red' :'Green'} title={showAdd ?'Close' :'Add'} action={onAdd} />
        </header>
    )
}

export default Header
Header.defaultProps = {
    title: "TASK TRACKER"
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}




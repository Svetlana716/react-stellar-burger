import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from "./custom-link.module.css";

const CustomLink = (props) => {
    const { children, to, ...others } = props;

    const resolved = useResolvedPath(to);

    const match = useMatch({path: resolved.pathname, end: to === '/profile' ? true : false});

    const style = match ? styles.activeLink : styles.inactiveLink;
    
    return (
        <Link to={to} className={style} {...others}>
            {children }
        </Link>
    )
}

export default CustomLink
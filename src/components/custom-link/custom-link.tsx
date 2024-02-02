import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactNode } from "react";
import styles from "./custom-link.module.css";

type Props = {
    to: string;
    children?: ReactNode;
  };

const CustomLink = ({ children, to, ...others }: Props) => {

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
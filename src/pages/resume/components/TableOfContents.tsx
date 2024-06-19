import { Link } from 'react-router-dom';
import styles from './TableOfContents.module.scss';

interface Props {
  content: string;
}

const TableOfContents = ({ content }: Props) => {
  const regex = /^(#+)\s+(.+)$/gm;
  const headings = content.match(regex);

  return (
    <nav className={styles.nav} aria-label="Table of Contents">
      <div className={styles.wrapper}>
        {headings?.map((heading, index) => {
          const level = heading.split(' ')[0].length;
          const title = heading.split(' ')[1];

          return (
            <Link
              to={`#${title}`}
              key={index}
              className={styles.link}
              style={{ marginLeft: `${level * 10}px` }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${title}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default TableOfContents;

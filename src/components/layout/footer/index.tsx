import teamMembers from '../../../data/teamMembersData';
import { FaEnvelope, FaGithub, FaBlog } from 'react-icons/fa';
import styles from './footer.module.scss';

function Footer() {
  const feMembers = teamMembers.filter((member) => member.role === 'FE');
  const beMembers = teamMembers.filter((member) => member.role === 'BE');

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-section']}>
          <h2>Fast Time</h2>
          <p>패스트캠퍼스 부트캠프 학생들을 위한 온라인 커뮤니티</p>
        </div>
        <div className={styles['footer-section']}>
          <h2>Our Team</h2>
          <div className={styles['team-list-container']}>
            <div className={styles['team-list']}>
              <h3>Front-End Team</h3>
              <ul className={styles['team-members-list']}>
                {feMembers.map((member, index) => (
                  <li key={index}>
                    {member.name}
                    <div className={styles['icon-text-container']}>
                      <a href={member.link}>
                        <FaGithub />
                        <span>{member.link.replace(/^https?:\/\//, '')}</span>
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <FaEnvelope />
                        <span>{member.email}</span>
                      </a>
                      {member.blog && (
                        <a href={member.blog}>
                          <FaBlog />
                          <span>{member.blog.replace(/^https?:\/\//, '')}</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles['team-list']}>
              <h3>Back-End Team</h3>
              <ul className={styles['team-members-list']}>
                {beMembers.map((member, index) => (
                  <li key={index}>
                    {member.name}
                    <div className={styles['icon-text-container']}>
                      <a href={member.link}>
                        <FaGithub />
                        <span>{member.link.replace(/^https?:\/\//, '')}</span>
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <FaEnvelope />
                        <span>{member.email}</span>
                      </a>
                      {member.blog && (
                        <a href={member.blog}>
                          <FaBlog />
                          <span>{member.blog.replace(/^https?:\/\//, '')}</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles['footer-section']}>
          <h2>Contact</h2>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <br />
          <p>
            <a className={styles['github-link']} href="https://github.com/fcstudy-project">
              <FaGithub />
              <span>GitHub Repository →</span>
            </a>
          </p>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <p>&copy; {new Date().getFullYear()} Fast Time. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
